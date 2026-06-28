# 業務設計

参照：[基本設計](./basic-design.md) / [要件定義](../01-requirements/requirements.md)

---

## 業務一覧

| 業務ID | 業務名（日本語） | 業務名（英語） | 概要 |
|--------|--------------|--------------|------|
| SET | アプリ設定 | App Setup | 初回起動時に必要なパーミッションを取得する |
| WLK | 歩行記録 | Walk Recording | 歩行セッションの開始・GPS/歩数収集・停止・保存を行う |
| TRV | 踏破管理 | Traversal | GPS軌跡と旧街道を照合し、踏破進捗を管理する |
| HIS | 記録照会 | History Inquiry | 過去の歩行記録の一覧・詳細を閲覧する |

---

## 業務関連図

```mermaid
flowchart TD
    SET["SET\nアプリ設定"] -->|権限付与後| WLK["WLK\n歩行記録"]
    SET -->|権限付与後| HIS["HIS\n記録照会"]
    WLK -->|GPS点を提供| TRV["TRV\n踏破管理"]
    WLK -->|セッションを保存| HIS
```

---

## 業務フロー

### SET：アプリ設定

```mermaid
flowchart TD
    A([アプリ起動]) --> A2{"未完了の WalkSession\n（finished_at = NULL）があるか？"}
    A2 -->|あり| A3["未完了セッションを破棄\n（walk_session + 関連 track_point を DELETE）"]
    A3 --> B{権限状態を確認}
    A2 -->|なし| B
    B -->|全権限付与済み| C([メイン画面へ])
    B -->|未付与あり| D["SET001\nパーミッションリクエスト画面\n権限の用途をユーザーに説明"]
    D --> E[システムダイアログを表示]
    E -->|許可| F{全権限が揃ったか？}
    F -->|Yes| C
    F -->|No| D
    E -->|二度と表示しないで拒否| G[端末の設定アプリへ誘導するボタンを表示]
```

> **未完了セッションの破棄方針**：強制終了時は `steps`・`distance_meters` が途中の値のまま残るため、不正確なデータとして起動時にサイレント削除する。ユーザーへの通知は行わない。

---

### WLK：歩行記録

```mermaid
flowchart TD
    A["WLK001 記録画面"] --> B["記録を開始するボタン押下"]
    B --> C["ForegroundService 起動\n常駐通知を表示（記録中・経過時間）"]
    C --> D["GPSを5秒ごとに取得"]
    C --> E["歩数センサーを監視"]
    D -->|取得成功| F["TrackPoint を DB に保存"]
    F --> G["TRV（踏破判定）へ渡す"]
    D -->|取得失敗| H["Warning ログを出力\n次回取得まで待機"]
    E --> I["差分を歩数として更新"]
    C --> J["記録を停止するボタン押下"]
    J --> K["ForegroundService 停止\n常駐通知を消去"]
    K --> L["WalkSession を DB に保存\nfinished_at・steps・distance_meters を確定"]
    L --> M["WLK001 記録画面に結果を表示"]
```

---

### TRV：踏破管理

WLK から GPS 点が提供されるたびに実行する。

```mermaid
flowchart TD
    A["GPS点を受け取る"] --> B["GeoJSON からセグメントを取得\n（初回のみ読み込み、以降はキャッシュ）"]
    B --> C["全セグメントへの最短距離を算出"]
    C --> D{最短距離 ≤ 50m の\nセグメントあり？}
    D -->|なし| E([処理終了])
    D -->|あり| F{DB に未登録か？}
    F -->|登録済み| E
    F -->|未登録| G["TraversedSegment を DB に保存\nhighway_id・segment_index・traversed_at"]
    G --> H["踏破進捗率を再計算\n踏破済み距離合計 ÷ 全体距離 × 100"]
    H --> I["TRV001 踏破進捗画面に反映"]
```

---

### HIS：記録照会

```mermaid
flowchart TD
    A["HIS001 記録一覧画面"] --> B["WalkSession 一覧を DB から取得\n（started_at 降順）"]
    B --> C{件数}
    C -->|0件| D["まだ記録がありませんを表示"]
    C -->|1件以上| E["セッション一覧をスクロール表示"]
    E --> F["セッションをタップ"]
    F --> G["HIS002 記録詳細画面"]
    G --> H["TrackPoint を DB から取得"]
    H --> I{件数}
    I -->|0件| J["GPS データなしを表示"]
    I -->|1件以上| K["地図上にポリライン描画\n歩数・距離・所要時間・開始/終了時刻を表示"]
```
