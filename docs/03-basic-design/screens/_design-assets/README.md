# _design-assets/ — デザインカンプ共有アセット

デザインカンプ HTML（`../SET001-*.html` 等）が参照する共有ファイル群。

| ファイル | 内容 |
|---|---|
| `tokens.css` | デザイントークン全量（カラー・タイポ・スペーシング・シェイプ・エレベーション）をまとめた単一 CSS |
| `bundle.js` | WalkingTrackerDesignSystem コンポーネント群のコンパイル済み JS（claude.ai/design から生成）|

## 更新ルール

- `tokens.css` はデザインシステムドキュメント（`../design-system/`）の変更に追随して更新する
- `bundle.js` はデザインシステムプロジェクト（`https://claude.ai/design/p/145207bd-f81b-495d-9899-994364cbcb56`）を更新した後、再取得して差し替える
