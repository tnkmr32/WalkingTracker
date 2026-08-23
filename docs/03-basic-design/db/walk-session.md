# テーブル定義：walk_session

参照：[テーブル一覧](./README.md)

---

## テーブル概要

| 項目 | 内容 |
|------|------|
| 物理テーブル名 | `walk_session` |
| エンティティクラス名 | `WalkSession` |
| 概要 | 歩行セッション。記録の開始から停止までを1レコードとして管理する |
| 関連業務 | WLK（歩行記録）・HIS（記録照会） |

---

## カラム定義

| カラム名 | Room 型 | SQLite 型 | PK | NOT NULL | デフォルト | 説明 |
|---------|---------|-----------|----|---------|-----------|----|
| `id` | `Long` | `INTEGER` | ✓ | ✓ | AUTOINCREMENT | セッションID |
| `started_at` | `Long` | `INTEGER` | | ✓ | | 開始日時（Unix ミリ秒） |
| `finished_at` | `Long?` | `INTEGER` | | ✗ | `NULL` | 終了日時（Unix ミリ秒）。記録中は `NULL` |
| `steps` | `Int` | `INTEGER` | | ✓ | `0` | 合計歩数 |
| `distance_meters` | `Float` | `REAL` | | ✓ | `0.0` | 合計歩行距離（メートル） |

---

## インデックス

| インデックス名 | カラム | 種別 | 目的 |
|--------------|--------|------|------|
| `idx_walk_session_started_at` | `started_at` | 通常 | 日付降順での一覧取得（HIS001 記録一覧画面）を高速化 |

---

## 制約

| 制約種別 | 対象カラム | 内容 |
|---------|-----------|------|
| PRIMARY KEY | `id` | 単一レコードの一意識別 |

---

## 関連テーブル

| 関連テーブル | 関係 | 結合キー |
|------------|------|---------|
| `track_point` | 1対多 | `track_point.session_id` = `walk_session.id` |
