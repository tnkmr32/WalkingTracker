# 実現方式：バックグラウンドトラッキング

## 課題

歩行記録はユーザーがアプリを閉じている間も継続する必要がある。
通常のAndroidプロセスは画面が非表示になるとシステムに停止させられるため、継続的なGPS・歩数取得には特別な仕組みが必要になる。

## 採用方式：ForegroundService

常駐通知を表示しながらバックグラウンドで動作し続けるForegroundServiceを使用する。
Android 13（minSdk）以降では `POST_NOTIFICATIONS` パーミッションが必須となる。

## GPS取得

| 項目 | 決定内容 |
|------|----------|
| API | FusedLocationProviderClient |
| 取得間隔 | 5秒 |
| 精度モード | HIGH_ACCURACY |

FusedLocationProviderClientはGPS・Wi-Fi・セルタワーを自動で組み合わせて精度とバッテリーを最適化するため、生のLocationManagerより消費電力が低い。
取得間隔5秒はGPS誤差の蓄積を抑えつつ12時間使用でバッテリー消費10%以内の要件を満たすバランス値。

## 歩数取得

| 項目 | 決定内容 |
|------|----------|
| API | SensorManager（TYPE_STEP_COUNTER） |
| 方式 | 起動時の累積値を基準とし、差分を歩数として算出 |

TYPE_STEP_COUNTERはハードウェアセンサーによるカウントのため、ソフトウェア実装より消費電力が低い。
端末再起動で累積値がリセットされるため、サービス起動時の値を基準値として保持する。

## 処理フロー

```
開始ボタン押下
  └─→ ForegroundService 起動
         ├─ GPS を 5秒ごとに取得 → Entity層へ保存
         └─ 歩数センサーを監視 → 差分を歩数として更新

停止ボタン押下
  └─→ ForegroundService 停止・セッション確定
```
