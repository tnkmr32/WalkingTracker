# データ設計

参照：[基本設計](./basic-design.md) / [アーキテクチャ設計](../02-architecture-design/architecture.md)

---

## エンティティ一覧

| エンティティ（Room テーブル） | 説明 |
|------------------------------|------|
| `WalkSession` | 歩行セッション。1回の開始〜停止を1レコードとして管理 |
| `TrackPoint` | GPS 軌跡点。セッションに紐づくGPS座標の時系列データ |
| `TraversedSegment` | 踏破済みセグメント。旧街道の各区間の踏破状態を管理 |
| `AppSettings` | アプリ全体設定。シングルトン（`id = 1` の1行のみ） |

---

## テーブル設計

詳細なテーブル定義は `db/` 配下を参照。

| ファイル | テーブル名 |
|---------|-----------|
| [db/table-list.md](./db/table-list.md) | テーブル一覧・ER図 |
| [db/walk-session.md](./db/walk-session.md) | `walk_session` |
| [db/track-point.md](./db/track-point.md) | `track_point` |
| [db/traversed-segment.md](./db/traversed-segment.md) | `traversed_segment` |
| [db/app-settings.md](./db/app-settings.md) | `app_settings` |

---

## アセット

| ファイル | 内容 |
|---------|------|
| [asset/highway-geojson.md](./asset/highway-geojson.md) | 旧街道 GeoJSON（フォーマット・プロパティ定義） |

