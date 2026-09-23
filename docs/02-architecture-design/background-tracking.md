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
| 取得間隔 | 10秒 |
| 精度モード | BALANCED_POWER_ACCURACY |

FusedLocationProviderClientはGPS・Wi-Fi・セルタワーを自動で組み合わせて精度とバッテリーを最適化するため、生のLocationManagerより消費電力が低い。

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
         ├─ GPS を 10秒ごとに取得
         │     └─→ RecordTrackPointUseCase 実行（TrackPoint を Entity層へ保存）
         │            └─→ EvaluateTraversalUseCase 実行（踏破判定・TraversedSegment を保存）
         └─ 歩数センサーを監視 → 差分を歩数として更新

停止ボタン押下
  └─→ ForegroundService 停止・セッション確定
```

## 権限の検知手段（指摘#15対応）

GPS取得ループ（10秒ごと）の先頭で `ContextCompat.checkSelfPermission()` により `ACCESS_FINE_LOCATION`・`ACTIVITY_RECOGNITION` の状態を毎回確認する（プロアクティブ確認）。`SecurityException`は権限剥奪時に必ず投げられる保証がなく検知手段として頼りにくいため、これが発生した場合も同様に扱うフォールバックと位置づける。

**ただし、このポーリングだけでは検知できないケースがあることがPoC実機検証で判明している**（[verification-results-20260922_163720.md](../99-others/poc/verification-results-20260922_163720.md) 課題3）。フォアグラウンドサービスが使用中の`ACCESS_FINE_LOCATION`を「設定」画面から剥奪すると、Android OSはその効力を即座に発生させるためアプリのプロセスそのものを強制終了する。プロセスが終了した時点でそのプロセス内のコード（ポーリングを含む）は一切実行できないため、これはアプリ側の実装では回避・先回り検知できない、Androidのプロセスモデル上の制約である。

そのため権限の検知は以下の2経路を組み合わせる。**経路Bが実機で確認された主経路であり、経路Aはプロセスが生存し続ける場合の高速パスという位置づけ**である。

| 経路 | 発生条件 | 検知タイミング |
|---|---|---|
| A. 実行中プロセス内でのポーリング検知 | 権限剥奪後もOSがプロセスを生かしたままにするケース（実機では未確認だが、将来のOS挙動・メーカー実装差の可能性に備えて残す） | 次のポーリング周期（最大10秒後）以内 |
| B. 起動時の未確定セッション検出 | 権限剥奪に伴いOSがプロセスを強制終了するケース（実機で確認済みの主要ケース） | アプリ起動時／`START_STICKY`によるサービス再起動時に、`walk_session.finished_at IS NULL`のセッションを検出し、かつ`ACCESS_FINE_LOCATION`が現在許可されていない場合に判定する |

経路Bの詳細（起動時クリーンアップ処理との統合）は [WLK001-recording.md](../03-basic-design/screens/WLK001-recording.md)「起動時クリーンアップ」を参照。権限ごとの剥奪時の挙動は [error-handling.md](./error-handling.md) を参照。

## WLK → TRV のデータ受け渡し（指摘#12対応）

ForegroundService は GPS 取得のたびに `RecordTrackPointUseCase` と `EvaluateTraversalUseCase` を**同一 Coroutine 内で同期的に順次呼び出す**（Flow/Channel による非同期のPub/Sub連携は採用しない）。

| 検討方式 | 採用 | 理由 |
|---|---|---|
| ForegroundServiceからのUseCase直接呼び出し | ○ | 踏破判定はTRV001画面の表示有無に関わらず継続する必要があり、Serviceが主導することでそれを保証できる。GPS取得間隔（10秒）ごとに1回実行すれば足り、Pub/Subの疎結合性を要する場面がない |
| TRV側ViewModelがRoomをFlow購読 | × | TRV001画面を開いていない間は判定が実行されず、踏破漏れが発生する |
| Service内でChannel/SharedFlowにemitし別途購読 | × | 直接呼び出しに比べ実装・デバッグの複雑さが増すだけでメリットがない（判定は都度1回・単一消費者のため） |

ForegroundService自体は業務ロジックを持たず、2つのUseCaseへ委譲するだけのオーケストレーション役に徹する（参照：[architecture.md 業務依存のレイヤー構成](./architecture.md)）。

TRV001画面（およびTRV001以外の踏破進捗表示）は、この処理結果をRoomの `TraversedSegment` Flowクエリで購読するのみで、判定処理そのものには関与しない。
