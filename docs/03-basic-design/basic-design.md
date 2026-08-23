# 基本設計（外部設計書）

参照：[アーキテクチャ設計](../02-architecture-design/architecture.md) / [要件定義](../01-requirements/requirements.md)

---

## 本設計書のスコープ

本設計書は **MVP（必須機能）のみ** を対象とする。要件定義書に記載された以下の追加機能は MVP スコープ外のため、本設計書には含めない。

| 機能 | 対象外の理由 |
|------|------------|
| 現在地コンテキスト情報（周辺の歴史・文化情報の提示） | MVP 対象外 |
| 歩行サマリー（日・週・月単位の集計表示） | MVP 対象外 |
| 休息日の表現（未踏の地・再開促進） | MVP 対象外 |

---

## ドキュメント構成

| ファイル | 内容 |
|---------|------|
| [business-logic-design.md](./business-logic-design.md) | 業務設計（業務一覧・業務フロー） |
| [screens/README.md](./screens/README.md) | 画面一覧・画面遷移 |
| [screens/SET001-permission.md](./screens/SET001-permission.md) | パーミッションリクエスト画面 |
| [screens/WLK001-recording.md](./screens/WLK001-recording.md) | 記録画面 |
| [screens/TRV001-traversal.md](./screens/TRV001-traversal.md) | 踏破進捗画面 |
| [screens/HIS001-history.md](./screens/HIS001-history.md) | 記録一覧画面 |
| [screens/HIS002-session-detail.md](./screens/HIS002-session-detail.md) | 記録詳細画面 |
| [data-design.md](./data-design.md) | データ設計（テーブル・GeoJSON・DataStore） |
| [db/README.md](./db/README.md) | テーブル一覧・ER図 |
| [db/walk-session.md](./db/walk-session.md) | テーブル定義：walk_session |
| [db/track-point.md](./db/track-point.md) | テーブル定義：track_point |
| [db/traversed-segment.md](./db/traversed-segment.md) | テーブル定義：traversed_segment |
| [asset/highway-geojson.md](./asset/highway-geojson.md) | アセット定義：旧街道 GeoJSON |
| [../02-architecture-design/permissions.md](../02-architecture-design/permissions.md) | 権限設計 |
| [../02-architecture-design/error-handling.md](../02-architecture-design/error-handling.md) | エラーハンドリング方針 |
| [../02-architecture-design/logging.md](../02-architecture-design/logging.md) | ログ設計 |

