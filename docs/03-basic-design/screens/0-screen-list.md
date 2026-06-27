# 画面設計：画面一覧・画面遷移

参照：[基本設計](../basic-design.md)

---

## 画面一覧

| 画面ID | 画面名 | クラス名（Composable） | 概要 |
|--------|--------|----------------------|------|
| SET001 | パーミッションリクエスト画面 | `PermissionScreen` | 必要なパーミッションを説明してリクエストする |
| WLK001 | 記録画面 | `RecordingScreen` | 歩行の開始・停止、リアルタイム歩数・距離・軌跡の表示 |
| TRV001 | 踏破進捗画面 | `TraversalScreen` | 旧街道の踏破進捗率と踏破済み区間の地図表示 |
| HIS001 | 記録一覧画面 | `HistoryScreen` | 過去の歩行セッション一覧 |
| HIS002 | 記録詳細画面 | `SessionDetailScreen` | 過去の特定セッションの詳細と軌跡地図 |

---

## 画面遷移

```mermaid
flowchart TD
    Start([起動]) --> SET001

    SET001["SET001\nパーミッションリクエスト画面"]
    SET001 -->|権限未付与のとき先行表示| SET001
    SET001 -->|全権限付与| Main["メイン画面\n（BottomNavigationBar）"]

    Main --> WLK001["WLK001\n記録画面"]
    Main --> TRV001["TRV001\n踏破進捗画面"]
    Main --> HIS001["HIS001\n記録一覧画面"]

    HIS001 -->|セッションをタップ| HIS002["HIS002\n記録詳細画面"]
    HIS002 -->|Back| HIS001
```

BottomNavigationBar のタブ：

| タブ | 画面 |
|------|------|
| 記録 | RecordingScreen |
| 踏破 | TraversalScreen |
| 履歴 | HistoryScreen |

---

## 各画面ドキュメント

| 画面ID | ファイル | 画面名 |
|--------|---------|--------|
| SET001 | [SET001-permission.md](./SET001-permission.md) | パーミッションリクエスト画面 |
| WLK001 | [WLK001-recording.md](./WLK001-recording.md) | 記録画面 |
| TRV001 | [TRV001-traversal.md](./TRV001-traversal.md) | 踏破進捗画面 |
| HIS001 | [HIS001-history.md](./HIS001-history.md) | 記録一覧画面 |
| HIS002 | [HIS002-session-detail.md](./HIS002-session-detail.md) | 記録詳細画面 |
