# シェイプ・角丸

参照：[デザインシステム](./README.md)

---

## 方針

- Material3 の **Shape スケール**に準拠する
- アクション系（ボタン・操作チップ）は完全な角丸（ピル）とし、コンテナ系は段階的な角丸を用いる
- 角丸は直値ではなくシェイプトークン経由で参照する

---

## 角丸スケール

| トークン | 値 | 適用先 |
|---|---|---|
| `shape-none` | 0dp | 区切り線など |
| `shape-xs` | 4dp | Snackbar、極小要素 |
| `shape-sm` | 8dp | フィルターチップ |
| `shape-md` | 12dp | カード、リスト項目 |
| `shape-lg` | 16dp | ボトムシート、オーバーレイパネル |
| `shape-xl` | 28dp | ダイアログ |
| `shape-full` | 9999dp | ボタン、アクションチップ、バッジ（ピル） |

---

## セマンティックエイリアス

| エイリアス | 参照先 | 用途 |
|---|---|---|
| `radius-button` | `shape-full` | FilledButton / OutlinedButton / TextButton / DualStateButton |
| `radius-card` | `shape-md` (12dp) | SessionCard、各種カード |
| `radius-chip` | `shape-sm` (8dp) | フィルターチップ |
| `radius-dialog` | `shape-xl` (28dp) | ConfirmDialog |
| `radius-sheet` | `shape-lg` (16dp) | RecordControlSection 等のオーバーレイシート |
| `radius-badge` | `shape-full` | Badge |

---

## ルール

- ボトムシート／オーバーレイパネルは上端のみ角丸にする運用も可（地図にせり出す場合）
- 鋭角（角丸 0）は区切り線以外に用いない
