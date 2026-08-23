package com.example.walkingtracker

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import com.example.walkingtracker.gpspoc.GpsTrackingService
import com.example.walkingtracker.gpspoc.TrackPointRecord
import com.example.walkingtracker.gpspoc.TrackingRepository
import com.example.walkingtracker.gpspoc.TrackingUiState
import com.example.walkingtracker.ui.theme.WalkingTrackerTheme
import java.text.SimpleDateFormat
import java.util.Locale

/**
 * GPS機能PoC（docs/99-others/poc/gps-poc-plan.md）用の単一画面。
 * 本設計・DB設計・UIデザインには従わない使い捨て実装。
 */
private val REQUIRED_PERMISSIONS = arrayOf(
    Manifest.permission.ACCESS_FINE_LOCATION,
    Manifest.permission.ACCESS_COARSE_LOCATION,
    Manifest.permission.ACTIVITY_RECOGNITION,
    Manifest.permission.POST_NOTIFICATIONS,
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            WalkingTrackerTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    GpsPocScreen(modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
}

@Composable
fun GpsPocScreen(modifier: Modifier = Modifier) {
    val context = LocalContext.current
    val state by TrackingRepository.state.collectAsState()

    val permissionLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions(),
    ) { /* 結果はfineLocationGranted()で都度チェックする */ }

    LaunchedEffect(Unit) {
        permissionLauncher.launch(REQUIRED_PERMISSIONS)
    }

    fun hasFineLocation(): Boolean = ContextCompat.checkSelfPermission(
        context,
        Manifest.permission.ACCESS_FINE_LOCATION,
    ) == PackageManager.PERMISSION_GRANTED

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Text("GPS取得 検証用アプリ（PoC）", style = MaterialTheme.typography.titleLarge)
        Text(
            "本設計に従わない検証用の使い捨てアプリです。詳細: docs/99-others/poc/gps-poc-plan.md",
            style = MaterialTheme.typography.bodySmall,
        )

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(
                enabled = !state.isRecording,
                onClick = {
                    if (hasFineLocation()) {
                        ContextCompat.startForegroundService(context, GpsTrackingService.startIntent(context))
                    } else {
                        permissionLauncher.launch(REQUIRED_PERMISSIONS)
                    }
                },
            ) { Text("記録開始") }

            Button(
                enabled = state.isRecording,
                onClick = { context.startService(GpsTrackingService.stopIntent(context)) },
            ) { Text("記録停止") }
        }

        StatusCard(state)

        HorizontalDivider()
        Text("直近の取得点（新しい順）", style = MaterialTheme.typography.titleMedium)

        LazyColumn(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            items(state.recentPoints) { point ->
                TrackPointRow(point)
            }
        }
    }
}

@Composable
private fun StatusCard(state: TrackingUiState) {
    val timeFormatter = remember(state) { SimpleDateFormat("HH:mm:ss", Locale.getDefault()) }
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text("ステータス: ${if (state.isRecording) "記録中" else "停止中"}")
            state.statusMessage?.let { Text(it, color = MaterialTheme.colorScheme.error) }
            state.permissionRevokedAtMillis?.let {
                Text(
                    "権限剥奪を検知: ${timeFormatter.format(it)}",
                    color = MaterialTheme.colorScheme.error,
                )
            }
            Text("累積取得件数: ${state.totalCount}　欠落/遅延回数: ${state.missedCount}")
            Text("最大取得間隔: ${"%.1f".format(state.maxGapSeconds)}秒")
            Text(
                "バッテリー: 開始時 ${state.batteryStartPercent?.let { "$it%" } ?: "-"} " +
                    "→ 現在 ${state.batteryCurrentPercent?.let { "$it%" } ?: "-"}",
            )
        }
    }
}

@Composable
private fun TrackPointRow(point: TrackPointRecord) {
    val timeFormatter = remember { SimpleDateFormat("HH:mm:ss", Locale.getDefault()) }
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(8.dp)) {
            Text(
                "${timeFormatter.format(point.timestampMillis)}  " +
                    "lat=${"%.6f".format(point.latitude)} lng=${"%.6f".format(point.longitude)}",
                style = MaterialTheme.typography.bodyMedium,
            )
            val gapLabel = point.secondsSinceLast?.let { "%.1f秒".format(it) } ?: "-"
            Text(
                "accuracy=${"%.1f".format(point.accuracyMeters)}m  前回からの間隔=$gapLabel" +
                    if (point.isDelayed) "（遅延）" else "",
                style = MaterialTheme.typography.bodySmall,
                color = if (point.isDelayed) MaterialTheme.colorScheme.error else MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}
