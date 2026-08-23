# GPS機能 技術検証（PoC）計画

参照：[background-tracking.md](../../02-architecture-design/background-tracking.md) / [permissions.md](../../02-architecture-design/permissions.md) / [highway-traversal.md](../../02-architecture-design/highway-traversal.md) / [requirements.md](../../01-requirements/requirements.md)

---

## 目的

方式設計（[background-tracking.md](../../02-architecture-design/background-tracking.md)）では GPS 取得方式として以下を決定済みだが、いずれも机上の判断であり実機での裏付けがない。

- API に `FusedLocationProviderClient` を採用
- 取得間隔 5秒、精度モード `HIGH_ACCURACY`
- `ForegroundService` によるバックグラウンド継続

本PoCでは、簡易なAndroidアプリを実装して実機検証を行い、上記方式が非機能要件（[requirements.md](../../01-requirements/requirements.md) 非機能要件）を満たせるかを本実装前に確認する。ここで前提が崩れた場合は本実装に入る前に方式を見直す。

---

## 検証項目

| # | 検証項目 | 検証したいこと | 関連する既存決定・要件 |
|---|---------|----------------|----------------------|
| 1 | GPS取得の安定性 | 5秒間隔でGPS取得が欠落・遅延なく継続するか | background-tracking.md「GPS取得」 |
| 2 | 画面OFF・バックグラウンド時の継続性 | アプリを閉じる／画面消灯後もForegroundServiceが60秒以上中断せず動作し続けるか | requirements.md「バックグラウンド処理が60秒以上途切れないこと」 |
| 3 | Doze モード・電池最適化の影響 | 端末のDozeモード（画面OFF長時間放置）・メーカー独自のバックグラウンド制限（Android 13〜16想定機種）でServiceが停止させられないか | background-tracking.md「採用方式：ForegroundService」 |
| 4 | バッテリー消費 | 一定時間（後述）記録し続けた際の消費電力から12時間あたりの消費率を推計し、10%以内に収まりそうか | requirements.md「12時間の使用でバッテリー消費が10%以内」 |
| 5 | GPS精度（屋外） | 屋外歩行時の実測誤差が想定値（概ね5〜15m）と乖離していないか | highway-traversal.md「GPS誤差」「閾値50m」の前提確認 |
| 6 | 権限まわりの実機挙動 | `ACCESS_FINE_LOCATION` / `POST_NOTIFICATIONS`（Android13+）の許可フロー、および記録中に設定画面から権限を剥奪した際に `checkSelfPermission()` ポーリングで検知できるか | permissions.md、background-tracking.md「権限の検知手段」 |
| 7 | Android 14 以降のFGS位置情報制約 | `FOREGROUND_SERVICE_LOCATION` 宣言のみでService起動・継続ができるか（Android14 targetSdk以降の追加制約の有無） | permissions.md「FOREGROUND_SERVICE_LOCATION」 |

---

## 検証用アプリ（簡易実装）

本設計・DB設計・UIデザインには従わず、検証に必要な最小限の画面・ロジックのみを実装する使い捨てのアプリとする。

### 構成

| 項目 | 内容 |
|------|------|
| 画面 | 単一画面（開始／停止ボタン、直近の取得結果を画面上に表示） |
| GPS取得 | `FusedLocationProviderClient`、5秒間隔、`PRIORITY_HIGH_ACCURACY` |
| バックグラウンド動作 | `ForegroundService`（常駐通知を表示） |
| 権限要求 | `ACCESS_FINE_LOCATION` / `ACTIVITY_RECOGNITION` / `POST_NOTIFICATIONS` を起動時にランタイム要求 |
| データ保存 | Room等の永続化は行わず、取得点を **Logcat出力** ＋ 画面上のリスト表示のみ（件数・タイムスタンプ・緯度経度・精度(accuracy)・バッテリー残量を記録） |
| 対象外 | Room DB、歩数センサー、旧街道踏破判定、地図表示、本番UIデザイン |

### 画面表示項目（検証データ収集用）

- 現在のステータス（記録中／停止中）
- 直近取得点：取得時刻・緯度経度・accuracy(m)・前回取得からの経過秒数
- 累積取得件数・欠落回数（想定5秒間隔から大きくズレた回数）
- 記録開始時からのバッテリー残量推移（開始時%・現在%）

---

## 検証手順

1. 検証用アプリを実機（Android 13 / 14 / 16 相当のいずれか複数機種）にインストール
2. 屋外にて記録を開始し、下記の状態を組み合わせて最低30分以上継続する
   - 画面ON・アプリフォアグラウンド
   - 画面OFF（ロック状態）
   - 他アプリ使用中（バックグラウンド）
3. 記録中に「設定」からアプリの位置情報権限を剥奪し、検知までの遅延・アプリ側の挙動を確認する（検証項目6）
4. Logcat出力と画面表示から、検証項目1・2・3・5の結果を記録する
5. 開始時・終了時のバッテリー残量から消費率を算出し、12時間換算で検証項目4を評価する
6. 各機種・Androidバージョンごとに結果を一覧化する

---

## 判定基準

| 検証項目 | 合格ライン |
|---------|-----------|
| 1. GPS取得の安定性 | 取得間隔が5秒±2秒以内に収まる割合が95%以上 |
| 2. バックグラウンド継続性 | 60秒以上の中断が発生しない |
| 3. Doze・電池最適化 | 上記1・2の条件を、画面OFF状態でも満たす |
| 4. バッテリー消費 | 12時間換算で10%以内 |
| 5. GPS精度 | 屋外実測のaccuracy値が概ね5〜15mの範囲に収まる |
| 6. 権限検知 | 権限剥奪から次回GPS取得ループ（最大5秒後）以内に検知できる |
| 7. FGS位置情報制約 | マニフェスト宣言のみでService起動・継続がAndroid14以降でも成功する |

いずれかが不合格の場合、[background-tracking.md](../../02-architecture-design/background-tracking.md) の該当方式（取得間隔・精度モード・Service方式）を見直す。

---

## スコープ外

- Room DB・アーキテクチャ層構成（ViewModel/UseCase/Repository等）の検証
- 歩数センサー（TYPE_STEP_COUNTER）の検証
- 旧街道踏破判定ロジックの検証
- 本番UI・デザインシステムへの準拠
- 自動テストの整備

---

## 成果物

- 本検証アプリのソースコード（本リポジトリのブランチ上で使い捨て実装、本実装へのマージは行わない）
- 機種・Androidバージョンごとの検証結果一覧（本ドキュメントへ追記、もしくは別紙として `docs/99-others/poc/` 配下に追加）
