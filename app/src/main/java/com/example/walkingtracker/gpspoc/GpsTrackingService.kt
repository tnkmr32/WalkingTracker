package com.example.walkingtracker.gpspoc

import android.Manifest
import android.annotation.SuppressLint
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.content.pm.ServiceInfo
import android.location.Location
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.ServiceCompat
import androidx.core.content.ContextCompat
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Locale

/**
 * GPS機能PoC（docs/99-others/poc/gps-poc-plan.md）用のForegroundService。
 *
 * 方式設計（background-tracking.md）の以下を実機検証する：
 *  - FusedLocationProviderClient / 5秒間隔 / HIGH_ACCURACY
 *  - ForegroundServiceによるバックグラウンド継続（検証項目2・3）
 *  - checkSelfPermission()ポーリングによる権限剥奪検知（検証項目6）
 *  - FOREGROUND_SERVICE_LOCATION宣言のみでのService起動・継続（検証項目7）
 *
 * Room等の永続化は行わず、取得点はLogcat出力とTrackingRepository（画面表示用）にのみ渡す。
 * 本実装への統合は行わない使い捨てクラス。
 */
class GpsTrackingService : Service() {

    companion object {
        private const val TAG = "GpsPoc"
        private const val NOTIFICATION_CHANNEL_ID = "gps_poc_channel"
        private const val NOTIFICATION_ID = 1001
        private const val INTERVAL_MILLIS = 5_000L

        const val ACTION_START = "com.example.walkingtracker.gpspoc.action.START"
        const val ACTION_STOP = "com.example.walkingtracker.gpspoc.action.STOP"

        fun startIntent(context: Context): Intent =
            Intent(context, GpsTrackingService::class.java).setAction(ACTION_START)

        fun stopIntent(context: Context): Intent =
            Intent(context, GpsTrackingService::class.java).setAction(ACTION_STOP)
    }

    private val serviceJob = SupervisorJob()
    private val serviceScope = CoroutineScope(serviceJob)
    private var permissionPollJob: Job? = null

    private lateinit var fusedLocationClient: com.google.android.gms.location.FusedLocationProviderClient
    private var lastLocationElapsedRealtimeMillis: Long? = null
    private val timeFormatter = SimpleDateFormat("HH:mm:ss", Locale.getDefault())

    private val locationCallback = object : LocationCallback() {
        override fun onLocationResult(result: LocationResult) {
            val location = result.lastLocation ?: return
            handleNewLocation(location)
        }
    }

    override fun onCreate() {
        super.onCreate()
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        createNotificationChannel()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_STOP -> {
                stopTracking(statusMessage = "ユーザー操作により記録を停止しました")
                return START_NOT_STICKY
            }
            else -> startTracking()
        }
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        serviceJob.cancel()
        fusedLocationClient.removeLocationUpdates(locationCallback)
        super.onDestroy()
    }

    @SuppressLint("MissingPermission") // hasFineLocationPermission()で事前チェック済み
    private fun startTracking() {
        if (!hasFineLocationPermission()) {
            Log.w(TAG, "ACCESS_FINE_LOCATION未許可のため開始を中止")
            TrackingRepository.stopRecording("位置情報の権限がないため開始できませんでした")
            stopSelf()
            return
        }

        val notification = buildNotification(text = "GPS取得を開始しています…")
        ServiceCompat.startForeground(
            this,
            NOTIFICATION_ID,
            notification,
            ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION,
        )

        TrackingRepository.reset(batteryStartPercent = readBatteryPercent(this))
        lastLocationElapsedRealtimeMillis = null

        val locationRequest = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, INTERVAL_MILLIS)
            .setMinUpdateIntervalMillis(INTERVAL_MILLIS)
            .build()
        fusedLocationClient.requestLocationUpdates(
            locationRequest,
            locationCallback,
            mainLooper,
        )

        Log.i(TAG, "GPS記録を開始しました (interval=${INTERVAL_MILLIS}ms, priority=HIGH_ACCURACY)")
        startPermissionPolling()
    }

    /**
     * background-tracking.md「権限の検知手段」：GPS取得ループ（5秒ごと）の先頭で
     * checkSelfPermissionにより権限状態を毎回確認する（検証項目6）。
     * FusedLocationProviderClientは権限剥奪後は単にコールバックが止まるだけで
     * 例外が飛ぶ保証がないため、Location更新とは独立したポーリングで検知する。
     */
    private fun startPermissionPolling() {
        permissionPollJob?.cancel()
        permissionPollJob = serviceScope.launch {
            while (true) {
                delay(INTERVAL_MILLIS)
                if (!hasFineLocationPermission()) {
                    val now = System.currentTimeMillis()
                    Log.w(TAG, "ACCESS_FINE_LOCATION剥奪を検知 at ${timeFormatter.format(now)}")
                    stopTracking(
                        statusMessage = "位置情報の権限が取り消されたため記録を停止しました",
                        permissionRevoked = true,
                    )
                    break
                }
            }
        }
    }

    private fun handleNewLocation(location: Location) {
        val nowElapsed = android.os.SystemClock.elapsedRealtime()
        val previousElapsed = lastLocationElapsedRealtimeMillis
        val secondsSinceLast = previousElapsed?.let { (nowElapsed - it) / 1000.0 }
        lastLocationElapsedRealtimeMillis = nowElapsed

        val isDelayed = secondsSinceLast != null &&
            kotlin.math.abs(secondsSinceLast - EXPECTED_INTERVAL_SECONDS) > INTERVAL_TOLERANCE_SECONDS

        val record = TrackPointRecord(
            timestampMillis = System.currentTimeMillis(),
            latitude = location.latitude,
            longitude = location.longitude,
            accuracyMeters = location.accuracy,
            secondsSinceLast = secondsSinceLast,
            isDelayed = isDelayed,
        )

        val batteryPercent = readBatteryPercent(this)
        TrackingRepository.addPoint(record, batteryPercent)

        val gapLabel = secondsSinceLast?.let { String.format(Locale.getDefault(), "%.1f", it) } ?: "-"
        Log.i(
            TAG,
            "point lat=${location.latitude} lng=${location.longitude} " +
                "accuracy=${location.accuracy}m gap=${gapLabel}s " +
                "delayed=$isDelayed battery=$batteryPercent%",
        )
        if (secondsSinceLast != null && secondsSinceLast >= INTERRUPTION_THRESHOLD_SECONDS) {
            Log.w(TAG, "${INTERRUPTION_THRESHOLD_SECONDS}秒以上の中断を検知 gap=${gapLabel}s")
        }

        updateNotification(
            "件数=${TrackingRepository.state.value.totalCount} accuracy=${location.accuracy}m",
        )
    }

    private fun stopTracking(statusMessage: String?, permissionRevoked: Boolean = false) {
        permissionPollJob?.cancel()
        fusedLocationClient.removeLocationUpdates(locationCallback)
        if (permissionRevoked) {
            TrackingRepository.markPermissionRevoked(System.currentTimeMillis(), statusMessage.orEmpty())
        } else {
            TrackingRepository.stopRecording(statusMessage)
        }
        Log.i(TAG, "GPS記録を停止しました: $statusMessage")
        ServiceCompat.stopForeground(this, ServiceCompat.STOP_FOREGROUND_REMOVE)
        stopSelf()
    }

    private fun hasFineLocationPermission(): Boolean =
        ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.ACCESS_FINE_LOCATION,
        ) == PackageManager.PERMISSION_GRANTED

    private fun createNotificationChannel() {
        val channel = NotificationChannel(
            NOTIFICATION_CHANNEL_ID,
            "GPS PoC 記録中",
            NotificationManager.IMPORTANCE_LOW,
        )
        val manager = getSystemService(NotificationManager::class.java)
        manager.createNotificationChannel(channel)
    }

    private fun buildNotification(text: String): android.app.Notification =
        NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID)
            .setContentTitle("GPS取得PoC 記録中")
            .setContentText(text)
            .setSmallIcon(android.R.drawable.ic_menu_mylocation)
            .setOngoing(true)
            .setOnlyAlertOnce(true)
            .build()

    private fun updateNotification(text: String) {
        val manager = getSystemService(NotificationManager::class.java)
        manager.notify(NOTIFICATION_ID, buildNotification(text))
    }
}
