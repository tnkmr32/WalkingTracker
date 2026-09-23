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
import com.example.walkingtracker.gpspoc.TrackingStatePrefs
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
    // サービス起動・パーミッションチェックにAndroid APIを呼ぶためのContextを取得
    val context = LocalContext.current
    // TrackingRepositoryが保持するFlowをCompose状態として購読（値が変わるたびに再コンポーズ）
    val state by TrackingRepository.state.collectAsState()

    // 複数パーミッションを一括リクエストするランチャーを用意
    val permissionLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions(),
    ) { /* 結果はfineLocationGranted()で都度チェックする */ }

    // 画面初回表示時（Unitキーは変化しないため1回だけ）にパーミッションをリクエスト
    LaunchedEffect(Unit) {
        permissionLauncher.launch(REQUIRED_PERMISSIONS)
    }

    // 前回セッションが権限剥奪によりプロセスごと強制終了され、記録中に見せられなかったメッセージが
    // 残っていれば、ここで一度だけ拾って表示する（詳細: TrackingStatePrefsのコメント参照）
    LaunchedEffect(Unit) {
        TrackingStatePrefs.consumePendingRevocationMessage(context)?.let { (atMillis, message) ->
            TrackingRepository.markPermissionRevoked(atMillis, message)
        }
    }

    // 位置情報（Fine）の許可状態をその都度確認するヘルパー
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
        // 画面タイトルとPoCである旨の注意書き
        Text("GPS取得 検証用アプリ（PoC）", style = MaterialTheme.typography.titleLarge)
        Text(
            "本設計に従わない検証用の使い捨てアプリです。詳細: docs/99-others/poc/gps-poc-plan.md",
            style = MaterialTheme.typography.bodySmall,
        )

        // 記録開始／記録停止ボタン（記録状態に応じて片方のみ有効化）
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(
                enabled = !state.isRecording,
                onClick = {
                    if (hasFineLocation()) {
                        // 許可済みならフォアグラウンドサービスとしてGPS計測を開始
                        ContextCompat.startForegroundService(context, GpsTrackingService.startIntent(context))
                    } else {
                        // 未許可なら記録開始せず再度パーミッションをリクエスト
                        permissionLauncher.launch(REQUIRED_PERMISSIONS)
                    }
                },
            ) { Text("記録開始") }

            Button(
                enabled = state.isRecording,
                onClick = { context.startService(GpsTrackingService.stopIntent(context)) },
            ) { Text("記録停止") }
        }

        // 記録中/停止中や累積件数などの状態サマリー
        StatusCard(state)

        HorizontalDivider()
        Text("直近の取得点（新しい順）", style = MaterialTheme.typography.titleMedium)

        // 取得済みの座標を新しい順に一覧表示
        LazyColumn(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            items(state.recentPoints) { point ->
                TrackPointRow(point)
            }
        }
    }
}

// 記録状態・異常検知・累積統計・バッテリー消費をまとめて表示するステータスカード
@Composable
private fun StatusCard(state: TrackingUiState) {
    // stateが変わるたびにフォーマッタを作り直す（再コンポーズ間で使い回すためremember）
    val timeFormatter = remember(state) { SimpleDateFormat("HH:mm:ss", Locale.getDefault()) }
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            // 記録中/停止中の現在状態
            Text("ステータス: ${if (state.isRecording) "記録中" else "停止中"}")
            // エラー等のメッセージがある場合のみ表示
            state.statusMessage?.let { Text(it, color = MaterialTheme.colorScheme.error) }
            // 記録中にパーミッションが剥奪された場合、検知時刻を警告表示
            state.permissionRevokedAtMillis?.let {
                Text(
                    "権限剥奪を検知: ${timeFormatter.format(it)}",
                    color = MaterialTheme.colorScheme.error,
                )
            }
            // 累積取得件数と、欠落・遅延と判定した回数
            Text("累積取得件数: ${state.totalCount}　欠落/遅延回数: ${state.missedCount}")
            // これまでで最も間隔が開いた取得間隔（遅延の目安）
            Text("最大取得間隔: ${"%.1f".format(state.maxGapSeconds)}秒")
            // 記録開始時と現在のバッテリー残量比較（未取得ならハイフン表示）
            Text(
                "バッテリー: 開始時 ${state.batteryStartPercent?.let { "$it%" } ?: "-"} " +
                    "→ 現在 ${state.batteryCurrentPercent?.let { "$it%" } ?: "-"}",
            )
        }
    }
}

// 取得済み座標1件分を1行カードとして表示
@Composable
private fun TrackPointRow(point: TrackPointRecord) {
    // このRow内でしか使わないため都度remember（stateキーなし＝初回コンポーズ時のみ生成）
    val timeFormatter = remember { SimpleDateFormat("HH:mm:ss", Locale.getDefault()) }
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(8.dp)) {
            // 取得時刻・緯度・経度
            Text(
                "${timeFormatter.format(point.timestampMillis)}  " +
                    "lat=${"%.6f".format(point.latitude)} lng=${"%.6f".format(point.longitude)}",
                style = MaterialTheme.typography.bodyMedium,
            )
            // 前回取得からの経過秒数（初回など無い場合はハイフン）
            val gapLabel = point.secondsSinceLast?.let { "%.1f秒".format(it) } ?: "-"
            // 精度・間隔、遅延判定時は末尾に「（遅延）」を付加し文字色も強調
            Text(
                "accuracy=${"%.1f".format(point.accuracyMeters)}m  前回からの間隔=$gapLabel" +
                    if (point.isDelayed) "（遅延）" else "",
                style = MaterialTheme.typography.bodySmall,
                color = if (point.isDelayed) MaterialTheme.colorScheme.error else MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}
