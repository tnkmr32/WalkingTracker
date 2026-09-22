package com.example.walkingtracker.gpspoc

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.update

/**
 * GPS機能PoC（docs/99-others/poc/gps-poc-plan.md）用のデータモデル。
 * Room等の永続化は行わず、プロセス内メモリのみで保持する使い捨て実装。
 */

/** 想定取得間隔（秒）。判定基準は 5秒±2秒 = 3〜7秒。 */
const val EXPECTED_INTERVAL_SECONDS = 5.0
const val INTERVAL_TOLERANCE_SECONDS = 2.0

/** 60秒以上の中断を検知するための閾値（検証項目2）。 */
const val INTERRUPTION_THRESHOLD_SECONDS = 60.0

data class TrackPointRecord(
    val timestampMillis: Long,
    val latitude: Double,
    val longitude: Double,
    val accuracyMeters: Float,
    /** 直前の取得からの経過秒数。初回はnull。 */
    val secondsSinceLast: Double?,
    /** 想定間隔（5秒±2秒）から外れていた場合true。 */
    val isDelayed: Boolean,
)

data class TrackingUiState(
    val isRecording: Boolean = false,
    /** 新しい順（先頭が最新）。画面表示用に直近分のみ保持。 */
    val recentPoints: List<TrackPointRecord> = emptyList(),
    val totalCount: Int = 0,
    val missedCount: Int = 0,
    val maxGapSeconds: Double = 0.0,
    val batteryStartPercent: Int? = null,
    val batteryCurrentPercent: Int? = null,
    /** 記録中に位置情報権限が剥奪されたことを検知した時刻（epoch millis）。 */
    val permissionRevokedAtMillis: Long? = null,
    val statusMessage: String? = null,
)

/**
 * GpsTrackingService（バックグラウンドで更新する側）と
 * MainActivity（UI表示側）で状態を共有するためのプロセス内シングルトン。
 * Room等の永続化はスコープ外のためStateFlowのみで保持する。
 */
object TrackingRepository {
    private val _state = MutableStateFlow(TrackingUiState())
    val state: StateFlow<TrackingUiState> = _state

    private const val MAX_DISPLAYED_POINTS = 100

    fun reset(batteryStartPercent: Int?) {
        _state.value = TrackingUiState(
            isRecording = true,
            batteryStartPercent = batteryStartPercent,
            batteryCurrentPercent = batteryStartPercent,
        )
    }

    fun stopRecording(statusMessage: String? = null) {
        _state.update { it.copy(isRecording = false, statusMessage = statusMessage) }
    }

    fun addPoint(point: TrackPointRecord, batteryCurrentPercent: Int?) {
        _state.update { current ->
            val updatedPoints = (listOf(point) + current.recentPoints).take(MAX_DISPLAYED_POINTS)
            current.copy(
                recentPoints = updatedPoints,
                totalCount = current.totalCount + 1,
                missedCount = current.missedCount + if (point.isDelayed) 1 else 0,
                maxGapSeconds = maxOf(current.maxGapSeconds, point.secondsSinceLast ?: 0.0),
                batteryCurrentPercent = batteryCurrentPercent ?: current.batteryCurrentPercent,
            )
        }
    }

    fun markPermissionRevoked(atMillis: Long, message: String) {
        _state.update { current ->
            current.copy(
                isRecording = false,
                permissionRevokedAtMillis = atMillis,
                statusMessage = message,
            )
        }
    }
}
