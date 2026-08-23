# テーブル定義：track_point

参照：[テーブル一覧](./README.md)

---

## テーブル概要

| 項目 | 内容 |
|------|------|
| 物理テーブル名 | `track_point` |
| エンティティクラス名 | `TrackPoint` |
| 概要 | GPS 軌跡点。セッションに紐づく GPS 座標の時系列データ |
| 関連業務 | WLK（歩行記録）・TRV（踏破管理）・HIS（記録照会） |

---

## カラム定義

| カラム名 | Room 型 | SQLite 型 | PK | NOT NULL | デフォルト | 説明 |
|---------|---------|-----------|----|---------|-----------|----|
| `id` | `Long` | `INTEGER` | ✓ | ✓ | AUTOINCREMENT | ポイントID |
| `session_id` | `Long` | `INTEGER` | | ✓ | | 所属セッションID（`walk_session.id` への外部キー） |
| `latitude` | `Double` | `REAL` | | ✓ | | 緯度（WGS84） |
| `longitude` | `Double` | `REAL` | | ✓ | | 経度（WGS84） |
| `recorded_at` | `Long` | `INTEGER` | | ✓ | | 記録日時（Unix ミリ秒） |

---

## インデックス

| インデックス名 | カラム | 種別 | 目的 |
|--------------|--------|------|------|
| `idx_track_point_session_id` | `session_id` | 通常 | セッション別の軌跡取得（地図描画）を高速化 |
| `idx_track_point_session_id_recorded_at` | `session_id`, `recorded_at` | 複合 | セッション内の時系列順取得を高速化 |

---

## 制約

| 制約種別 | 対象カラム | 内容 |
|---------|-----------|------|
| PRIMARY KEY | `id` | 単一レコードの一意識別 |
| FOREIGN KEY | `session_id` | `walk_session.id` を参照。親セッション削除時は連鎖削除（CASCADE） |

---

## 関連テーブル

| 関連テーブル | 関係 | 結合キー |
|------------|------|---------|
| `walk_session` | 多対1 | `track_point.session_id` = `walk_session.id` |
