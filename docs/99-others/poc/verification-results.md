# GPS PoC 実機検証結果

参照：[gps-poc-plan.md](gps-poc-plan.md) / [release-build-procedure.md](release-build-procedure.md)

---

## 検証環境

| 項目 | 内容 |
|---|---|
| 実施日 | 2026-09-22 |
| 端末機種 | Pixel 6a |
| Androidバージョン | Android 16 |
| ビルド | リリースビルド（[release-build-procedure.md](release-build-procedure.md) の手順で作成） |
| 記録時間 | 約3〜4分（フォアグラウンド状態、短時間の動作確認ログ） |

※今回はビルド後の疎通確認レベルの短時間ログであり、[gps-poc-plan.md](gps-poc-plan.md)「検証手順」が求める30分以上・複数状態（画面ON/OFF・バックグラウンド）を網羅した本検証はこれから実施する。

---

## ログ抜粋

```
09-22 14:57:45.998 25723 25723 I GpsPoc  : point lat=35.877827 lng=139.7404749 accuracy=9.129m gap=7.4s delayed=true battery=99%
09-22 14:57:53.490 25723 25723 I GpsPoc  : point lat=35.8778268 lng=139.7404754 accuracy=9.14m gap=7.5s delayed=true battery=99%
09-22 14:58:01.011 25723 25723 I GpsPoc  : point lat=35.8778323 lng=139.7404646 accuracy=6.761m gap=7.5s delayed=true battery=99%
09-22 14:58:08.580 25723 25723 I GpsPoc  : point lat=35.8778338 lng=139.7404615 accuracy=5.635m gap=7.6s delayed=true battery=99%
09-22 14:58:16.049 25723 25723 I GpsPoc  : point lat=35.8778344 lng=139.7404603 accuracy=4.962m gap=7.5s delayed=true battery=99%
09-22 14:58:23.533 25723 25723 I GpsPoc  : point lat=35.8778343 lng=139.740461 accuracy=4.266m gap=7.5s delayed=true battery=99%
09-22 14:59:46.313 26510 26510 I GpsPoc  : GPS記録を開始しました (interval=5000ms, priority=HIGH_ACCURACY)
09-22 14:59:47.163 26510 26510 I GpsPoc  : point lat=35.8778319 lng=139.740469 accuracy=16.049m gap=-s delayed=false battery=99%
09-22 14:59:54.652 26510 26510 I GpsPoc  : point lat=35.8778284 lng=139.7404731 accuracy=27.474m gap=7.5s delayed=true battery=99%
09-22 15:00:02.128 26510 26510 I GpsPoc  : point lat=35.8778298 lng=139.7404659 accuracy=12.404m gap=7.5s delayed=true battery=99%
09-22 15:00:09.602 26510 26510 I GpsPoc  : point lat=35.8778287 lng=139.7404692 accuracy=9.04m gap=7.5s delayed=true battery=99%
```

---

## 検証項目ごとの結果

| # | 検証項目 | 結果 |
|---|---------|------|
| 1 | GPS取得の安定性 | **未達の疑いあり**。取得自体は継続しているが、取得間隔が判定基準（3〜7秒）をわずかに超える約7.4〜7.6秒で安定的に発生している。詳細は[課題1](#課題)参照 |
| 2 | 画面OFF・バックグラウンド時の継続性 | 未実施（今回はフォアグラウンド状態のみの短時間確認） |
| 3 | Dozeモード・電池最適化の影響 | 未実施 |
| 4 | バッテリー消費 | 未実施（記録時間が短くバッテリー残量に変化なし〈99%のまま〉のため評価不可） |
| 5 | GPS精度（屋外） | accuracy 4.2〜27.5mの範囲で観測。多くは基準範囲（概ね5〜15m）に収まるが、記録開始直後に27.5mとなる値も見られた。屋内外の条件を明確にした上での再測定が必要 |
| 6 | 権限まわりの実機挙動 | 未実施（今回は権限剥奪操作を行っていない） |
| 7 | Android 14以降のFGS位置情報制約 | `FOREGROUND_SERVICE_LOCATION`宣言のみでサービス起動・記録が成功し、クラッシュや例外は発生しなかった。ただし端末のAndroidバージョンが未記録のため、Android 14以降での確認として扱えるかは要確認 |

---

## 補足：ログ中の無関係なクラッシュについて

Logcatに以下のクラッシュが含まれていたが、`Process: com.mobilesuica.msb.android` の記載の通り本PoCアプリ（`com.example.walkingtracker`）とは無関係の別アプリ（モバイルSuica）のクラッシュであり、本検証の対象外。`adb logcat -s ... AndroidRuntime:E` はタグ名でのフィルタのためプロセスを問わず一致した。

```
09-17 11:29:02.603 27275 27275 E AndroidRuntime: FATAL EXCEPTION: main
09-17 11:29:02.603 27275 27275 E AndroidRuntime: Process: com.mobilesuica.msb.android, PID: 27275
09-17 11:29:02.603 27275 27275 E AndroidRuntime: java.lang.IllegalStateException: Can not perform this action after onSaveInstanceState
```

---

## 課題

### 課題1: GPS取得間隔が判定基準（5秒±2秒）からわずかに外れて安定的に発生している

- **事象**：`LocationRequest`に`interval=5000ms`（`setMinUpdateIntervalMillis`も5000ms）を指定しているにもかかわらず、実測の取得間隔が約7.4〜7.6秒でほぼ一定して発生し、[gps-poc-plan.md](gps-poc-plan.md)判定基準1「取得間隔が5秒±2秒（3〜7秒）以内に収まる割合が95%以上」を外れる値が連続していた。
- **特徴**：値がランダムに散らばるのではなく、2回の記録セッション（PID 25723・26510）いずれも約7.5秒に収束しており、単発的な遅延ではなくシステム的・構造的な要因が疑われる。
- **影響**：このまま本検証（30分以上・複数状態）を実施しても同様の傾向が続く場合、判定基準1が不合格となり、[background-tracking.md](../../02-architecture-design/background-tracking.md)の取得間隔・方式の見直しが必要になる可能性がある。

---

## 対応策

課題1について、以下の観点で原因を切り分ける。

1. **`LocationRequest`設定の見直し**
   `Priority.PRIORITY_HIGH_ACCURACY`指定時、Google Play services（FusedLocationProviderClient）側で要求間隔が内部的に調整される場合がある。`setMaxUpdateDelayMillis`や`setMinUpdateIntervalMillis`との組み合わせ、あるいは`Priority.PRIORITY_BALANCED_POWER_ACCURACY`等の他プライオリティでの挙動差を確認する。

2. **端末側の省電力設定の影響確認**
   端末の「バッテリー最適化」「アダプティブバッテリー」等の設定がフォアグラウンドアプリのGPS取得間隔にも影響していないか、設定を無効化した状態で再測定し比較する。

3. **計測方法自体の妥当性確認**
   `elapsedRealtime()`による`gap`算出がFusedLocationProviderClientのコールバック受信間隔をそのまま反映しているか、コールバック自体に処理遅延がないかをログの前後関係から再確認する（今回のログでは疑わしい遅延要因は見当たらないが、複数端末での再現性確認が必要）。

4. **再現性の確認**
   端末を変えて同様の傾向が出るか確認する。同一傾向が複数端末で再現する場合はシステム的要因（Google Play services側の丸め等）の可能性が高く、端末固有であれば個体・OSカスタマイズの影響を疑う。

5. **判定基準の見直し検討（最終手段）**
   上記1〜4で改善しない場合、実測値ベースで許容範囲（現行3〜7秒）の妥当性を[background-tracking.md](../../02-architecture-design/background-tracking.md)側の担当者と協議し、取得間隔設定または判定基準そのものの見直しを検討する。

---

## 次のアクション

- [x] 端末機種・Androidバージョンを記録環境表に追記する
- [ ] [gps-poc-plan.md](gps-poc-plan.md)の検証手順に沿った30分以上の本検証（屋外・画面ON/OFF・バックグラウンド）を実施する
- [ ] 課題1の対応策1〜4を検証し、原因を特定する
- [ ] 検証項目2・3・4・6を実施する
