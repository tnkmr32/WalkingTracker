# GPS PoC リリースビルド手順書

参照：[gps-poc-plan.md](gps-poc-plan.md)

---

## 目的

GPS機能PoC検証用アプリを実機検証するためのリリースビルド（`assembleRelease`）作成手順をまとめる。

デバッグビルド（`assembleDebug`）はデバッガアタッチ等のオーバーヘッドがあり、[gps-poc-plan.md](gps-poc-plan.md) の検証項目4（バッテリー消費）を正確に評価できないため、実機検証にはリリースビルドを使用する。

---

## 署名について

本アプリは検証後に破棄する使い捨てPoCであり、Playストア等への配布は行わない。そのため専用のリリース鍵は作成せず、`app/build.gradle.kts` の `release` ビルドタイプに **デバッグ鍵**（`~/.android/debug.keystore`、AGPが自動生成）を割り当てている。

```kotlin
// app/build.gradle.kts
buildTypes {
    release {
        signingConfig = signingConfigs.getByName("debug")
        ...
    }
}
```

- `isMinifyEnabled = false` のため、R8による難読化・シュリンクは行われない（Logcatのタグ名・クラス名はそのまま出力される）
- デバッグ鍵での署名のため `app-release.apk` と `app-debug.apk` は同じ端末に共存インストールできない（同一 `applicationId` で署名鍵が同じため上書きインストールになる）

---

## 前提環境

- JDK / Android SDK が導入済み（Android Studioでプロジェクトを開いたことがあれば `~/.android/debug.keystore` は既に存在する）
- 実機とPC/Macが USB接続、または同一ネットワーク上でADB接続可能
- 実機側で「開発者向けオプション」→「USBデバッグ」を有効化済み

---

## 手順

### 1. リポジトリを最新化する

```bash
git status
git pull
```

### 2. デバッグ鍵の存在を確認する

初回のみ。Android Studio / `./gradlew` を一度でも実行していれば自動生成されている。

```bash
ls ~/.android/debug.keystore
```

存在しない場合は、任意のデバッグ用タスク（例: `./gradlew assembleDebug`）を一度実行すると自動生成される。

### 3. リリースAPKをビルドする

プロジェクトルートで実行する。

```bash
./gradlew assembleRelease
```

- 初回はビルドに数十秒〜数分かかる
- `BUILD SUCCESSFUL` が表示されれば成功

生成物：

```
app/build/outputs/apk/release/app-release.apk
```

### 4. 実機を認識できているか確認する

```bash
adb devices
```

`device` と表示される端末が対象。`unauthorized` の場合は端末側の「USBデバッグを許可しますか」ダイアログを許可する。

複数端末を同時接続している場合は `-s <デバイスID>` を各コマンドに付与する。

### 5. 実機にインストールする

```bash
adb install -r app/build/outputs/apk/release/app-release.apk
```

- `-r` は既存インストール（デバッグビルド等）への上書きを許可するオプション
- 既に別の署名（例: Android Studioから直接runしたデバッグビルド）でインストール済みの場合、`INSTALL_FAILED_UPDATE_INCOMPATIBLE` エラーになることがある。その場合は一旦アンインストールしてから再インストールする

```bash
adb uninstall com.example.walkingtracker
adb install app/build/outputs/apk/release/app-release.apk
```

### 6. アプリを起動し、権限を許可する

端末側でアプリ「GPS取得 検証用アプリ（PoC）」を起動し、位置情報・通知・身体活動の権限要求ダイアログをすべて許可する。

Android 10以降で「バックグラウンドでの位置情報取得」を個別に許可する必要がある機種の場合、OS設定からアプリの位置情報権限を「常に許可」に変更する（[gps-poc-plan.md](gps-poc-plan.md) 検証項目6・7に関連）。

### 7. Logcatで動作を確認する

[GpsTrackingService.kt](../../../app/src/main/java/com/example/walkingtracker/gpspoc/GpsTrackingService.kt) は `"GpsPoc"` タグでログを出力する。

```bash
adb logcat -s "GpsPoc:*" AndroidRuntime:E
```

`*`はzsh等のシェルがグロブ展開しようとして `no matches found` になることがあるため、`"GpsPoc:*"` のようにクォートする（bashではクォートなしでも動くが、シェル差異を避けるため常にクォート推奨）。

- `GpsPoc` … アプリ自身の記録開始/停止・取得点・権限剥奪検知のログ
- `AndroidRuntime:E` … アプリがクラッシュした場合のスタックトレース確認用

記録を開始すると5秒間隔で `point lat=... lng=... accuracy=...m gap=...s delayed=... battery=...%` が出力される。これを [gps-poc-plan.md](gps-poc-plan.md) の検証項目1・2・3・5の記録に用いる。

### 7.5. PC接続なしで屋外検証する場合（CSVログファイルの利用）

TC-04（Dozeモード放置）・TC-05（バッテリー消費率）は、USB給電や同一Wi-Fi前提のワイヤレスADBがバッテリー消費測定や屋外での移動を妨げるため、PC接続を伴うLogcatのリアルタイム監視は行わない。

代わりに、アプリは記録開始ごとにLogcatと同内容をアプリ専用の外部ストレージ領域へCSVファイルとして書き出す（[GpsTrackingService.kt](../../../app/src/main/java/com/example/walkingtracker/gpspoc/GpsTrackingService.kt)の`openLogFile()`/`writeLogLine()`）。

```
Android/data/com.example.walkingtracker/files/gps_poc_log_<記録開始日時 yyyyMMdd_HHmmss>.csv
```

- 屋外検証中はUSBケーブル・PC接続とも不要（端末単体で完結）
- 検証終了後（バッテリー測定は完了しているため充電の影響を気にせずよい）、USB再接続して以下でファイルを回収する

```bash
adb pull /storage/emulated/0/Android/data/com.example.walkingtracker/files/ ./gps_poc_logs/
```

- 複数の記録セッションを行った場合、上記ディレクトリに複数のCSVファイルが残るため、対象の記録開始日時（Logcatまたは画面表示で確認したファイル名。開始時に`Log.i(TAG, "ログファイル出力先: ...")`としても出力される）でファイルを特定する
- CSVの列は `timestamp,lat,lng,accuracy_m,gap_s,delayed,battery_percent` で、表計算ソフトや`awk`/`grep`等で後から解析できる

### 8. 検証終了後にアプリを終了する

「記録停止」ボタンを押してForegroundServiceを止めてからアプリを終了する。バックグラウンドで放置したまま検証を終える場合は、通知の常駐（"GPS取得PoC 記録中"）が消えたことを確認する。

---

## 再ビルドする場合

コード修正後は `assembleRelease` を再実行し、手順3〜5を繰り返す。`adb install -r` は同じ署名であれば上書きインストールできるため、手順6のアンインストールは通常不要。

```bash
./gradlew assembleRelease && adb install -r app/build/outputs/apk/release/app-release.apk
```

---

## トラブルシューティング

| 症状 | 原因・対処 |
|---|---|
| `adb devices` に端末が出ない | USBケーブル・デバッグ許可ダイアログ・USB接続モード（ファイル転送等）を確認 |
| `INSTALL_FAILED_UPDATE_INCOMPATIBLE` | 別署名でインストール済み。手順5の `adb uninstall` を実施 |
| `INSTALL_FAILED_USER_RESTRICTED` | 端末側で「提供元不明のアプリ」インストールが制限されている。設定から許可 |
| ビルドは成功するがインストールが固まる | 端末の画面ロックを解除し、インストール確認ダイアログが出ていないか端末側を確認 |
| `zsh: no matches found: GpsPoc:*` | `*` をシェルがグロブ展開しようとしたため。`"GpsPoc:*"` のようにクォートする |
| Logcatに何も出ない | タグ指定ミス、またはアプリが別端末で動いていないか `adb devices` で確認 |

---

## 成果物への反映

本手順で得たLogcat出力・バッテリー残量推移は、[gps-poc-plan.md](gps-poc-plan.md) の「検証手順」「判定基準」に基づき記録し、機種・Androidバージョンごとの結果一覧としてまとめる。
