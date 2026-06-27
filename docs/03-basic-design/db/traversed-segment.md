# テーブル定義：traversed_segment

参照：[テーブル一覧](./table-list.md)

---

## テーブル概要

| 項目 | 内容 |
|------|------|
| 物理テーブル名 | `traversed_segment` |
| エンティティクラス名 | `TraversedSegment` |
| 概要 | 踏破済みセグメント。旧街道の各区間をユーザーが通過したことを記録する |
| 関連業務 | TRV（踏破管理） |

---

## カラム定義

| カラム名 | Room 型 | SQLite 型 | PK | NOT NULL | デフォルト | 説明 |
|---------|---------|-----------|----|---------|-----------|----|
| `id` | `Long` | `INTEGER` | ✓ | ✓ | AUTOINCREMENT | レコードID |
| `highway_id` | `String` | `TEXT` | | ✓ | | 旧街道識別子（GeoJSON の `properties.id` と対応。例：`tokaido`） |
| `segment_index` | `Int` | `INTEGER` | | ✓ | | セグメントの連番（GeoJSON の `properties.segment_index` と対応） |
| `traversed_at` | `Long` | `INTEGER` | | ✓ | | 最初に踏破した日時（Unix ミリ秒） |

---

## インデックス

| インデックス名 | カラム | 種別 | 目的 |
|--------------|--------|------|------|
| `uq_traversed_segment_highway_segment` | `highway_id`, `segment_index` | UNIQUE | 同一セグメントの重複登録を防ぐ |
| `idx_traversed_segment_highway_id` | `highway_id` | 通常 | 旧街道別の踏破済みセグメント取得（進捗率計算）を高速化 |

---

## 制約

| 制約種別 | 対象カラム | 内容 |
|---------|-----------|------|
| PRIMARY KEY | `id` | 単一レコードの一意識別 |
| UNIQUE | `highway_id`, `segment_index` | 同一旧街道の同一セグメントを重複登録しない |

---

## 関連テーブル

なし（GeoJSON assets との対応はアプリコードで解決する）
