# カラー補足（サーフェストーン・反転・ステート）

参照：[カラーパレット](./color.md)

---

## On系・コンテナ補足ロール

[color.md](./color.md) の表に対する追加分。

| ロール | カラー | 用途 |
|---|---|---|
| On Background | `#1F1B16` | 背景上のテキスト（地図インクの暗茶） |
| On Surface | `#1F1B16` | サーフェス上のテキスト |
| Surface Variant | `#EDE1CF` | 補助的な面（やや沈めた領域） |
| On Surface Variant | `#4F4539` | 補助テキスト・ラベル・非アクティブアイコン |
| On Error | `#FFFFFF` | Error 上のテキスト |
| Error Container | `#F9DEDC` | エラー背景（淡赤） |
| On Error Container | `#410E0B` | Error Container 上のテキスト |
| Outline Variant | `#D0C3B0` | ヘアライン区切り・カード枠 |

---

## サーフェストーナル段階

M3 のトーナルエレベーションに対応する、クリーム基準のサーフェスコンテナ段階。値が上がるほど暖色・暗色に沈む。

| ロール | カラー | 主な用途 |
|---|---|---|
| Surface Container Lowest | `#FFFFFF` | 浮いたカード（純白） |
| Surface Container Low | `#F5EFE2` | エレベーション1相当の面 |
| Surface Container | `#EFE8D9` | ボトムナビ等 |
| Surface Container High | `#E9E1D0` | ダイアログ等 |
| Surface Container Highest | `#E3DBC8` | 最前面の一時要素 |
| Surface Dim | `#E0D9C9` | 沈めた背景 |
| Surface Bright | `#F8F4EA` | 明るい背景 |

---

## 反転・スクリム

| ロール | カラー | 用途 |
|---|---|---|
| Inverse Surface | `#34302A` | Snackbar の背景（暗色面） |
| Inverse On Surface | `#F8EFE2` | Inverse Surface 上のテキスト |
| Inverse Primary | `#E0BE92` | 暗色面上のアクセント・アクション |
| Scrim | `#000000` | ダイアログ背後のスクリム（不透明度32%で使用） |

---

## ステートレイヤー不透明度

タッチ操作のフィードバックは Material のステートレイヤー（ロール色のオーバーレイ）で表現する。

| 状態 | 不透明度 |
|---|---|
| Hover | 8% |
| Focus | 12% |
| Pressed | 12% |
| Dragged | 16% |

詳細は [interaction-states.md](./interaction-states.md) を参照。
