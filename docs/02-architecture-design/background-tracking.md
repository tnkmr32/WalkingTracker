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
         ├─ GPS を 5秒ごとに取得
         │     └─→ RecordTrackPointUseCase 実行（TrackPoint を Entity層へ保存）
         │            └─→ EvaluateTraversalUseCase 実行（踏破判定・TraversedSegment を保存）
         └─ 歩数センサーを監視 → 差分を歩数として更新

停止ボタン押下
  └─→ ForegroundService 停止・セッション確定
```

## 権限の検知手段（指摘#15対応）

GPS取得ループ（5秒ごと）の先頭で `ContextCompat.checkSelfPermission()` により `ACCESS_FINE_LOCATION`・`ACTIVITY_RECOGNITION` の状態を毎回確認する（プロアクティブ確認を主手段とする）。`SecurityException`は権限剥奪時に必ず投げられる保証がなく検知手段として頼りにくいため、これが発生した場合も同様に扱うフォールバックと位置づける。

権限ごとの剥奪時の挙動は [error-handling.md](./error-handling.md) を参照。

## WLK → TRV のデータ受け渡し（指摘#12対応）

ForegroundService は GPS 取得のたびに `RecordTrackPointUseCase` と `EvaluateTraversalUseCase` を**同一 Coroutine 内で同期的に順次呼び出す**（Flow/Channel による非同期のPub/Sub連携は採用しない）。

| 検討方式 | 採用 | 理由 |
|---|---|---|
| ForegroundServiceからのUseCase直接呼び出し | ○ | 踏破判定はTRV001画面の表示有無に関わらず継続する必要があり、Serviceが主導することでそれを保証できる。GPS取得間隔（5秒）ごとに1回実行すれば足り、Pub/Subの疎結合性を要する場面がない |
| TRV側ViewModelがRoomをFlow購読 | × | TRV001画面を開いていない間は判定が実行されず、踏破漏れが発生する |
| Service内でChannel/SharedFlowにemitし別途購読 | × | 直接呼び出しに比べ実装・デバッグの複雑さが増すだけでメリットがない（判定は都度1回・単一消費者のため） |

ForegroundService自体は業務ロジックを持たず、2つのUseCaseへ委譲するだけのオーケストレーション役に徹する（参照：[architecture.md 業務依存のレイヤー構成](./architecture.md)）。

TRV001画面（およびTRV001以外の踏破進捗表示）は、この処理結果をRoomの `TraversedSegment` Flowクエリで購読するのみで、判定処理そのものには関与しない。
