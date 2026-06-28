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

---

## パフォーマンス設計

要件定義：地図・軌跡の描画が **2秒以内** に完了すること。

### TrackPoint のデータ量見積もり

| 条件 | 計算 | 件数 |
|------|------|------|
| 記録間隔 | 5秒に1点 | - |
| 1時間あたり | 3,600 ÷ 5 | 720 点 |
| 1日1時間・90日分 | 720 × 90 | 約 64,800 点 |
| 1日1時間・365日分 | 720 × 365 | 約 263,000 点 |

長期利用では TrackPoint が数十万件規模になり、全件を地図に描画すると2秒以内の要件を満たせない可能性がある。

### 対策

| 画面 | 表示内容 | 対策 |
|------|---------|------|
| WLK001（待機中） | 過去の全セッション軌跡 | **直近90日分**のセッションに絞って取得（`started_at` インデックスを使用） |
| HIS002 | 特定セッションの軌跡 | `session_id` インデックスで絞り込み済みのため対策不要 |
| TRV001 | 旧街道セグメント・踏破済み区間 | GeoJSON はアプリ起動時にメモリキャッシュ済みのため対策不要 |

> **WLK001 の90日制限について**：90日を超える軌跡は地図に描画しないが、HIS001・HIS002 からは引き続き参照可能。描画制限はパフォーマンスのための表示上の制約であり、データを削除するものではない。

