# デザインシステム

参照：[基本設計](../basic-design.md)

---

## ドキュメント構成

| ファイル | 内容 |
|---------|------|
| [color.md](./color.md) | カラーパレット・固定カラースキーム方針 |
| [typography.md](./typography.md) | タイポグラフィスケール |
| [components.md](./components.md) | UIコンポーネントセット |
| [icons.md](./icons.md) | アイコン・イラスト方針 |

---

## 基本方針

- **Material3（Material You）** を設計の基盤とする
- ダイナミックカラーは**使用しない**（UI の再現性・品質担保のため固定カラースキームを適用）
- ダークモード対応は MVP スコープ外（ライトモードのみ）
- コンポーネントは Jetpack Compose の Material3 ライブラリが提供するものを最大限活用し、カスタムコンポーネントは必要最小限にとどめる

---

## 関連 Issue

- [#1 デザインシステムの検討](../../00-Needs/issues.md)
