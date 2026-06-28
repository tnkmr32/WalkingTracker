# タイポグラフィスケール

参照：[デザインシステム](./README.md)

---

## 方針

- Material3 の **TypeScale** をそのまま使用する（独自フォントは導入しない）
- フォントファミリーは Android デフォルト（**Roboto**）
- スケールは `MaterialTheme.typography.*` 経由で参照し、直接サイズ指定しない

---

## スケール定義

Material3 の標準スケールと本アプリでの使用用途を紐づける。

| スタイル | Size | Weight | Line Height | 使用場面 |
|---------|------|--------|-------------|---------|
| displayLarge | 57sp | Regular | 64sp | 未使用 |
| displayMedium | 45sp | Regular | 52sp | 未使用 |
| displaySmall | 36sp | Regular | 44sp | 未使用 |
| headlineLarge | 32sp | Regular | 40sp | 未使用 |
| headlineMedium | 28sp | Regular | 36sp | 記録画面の大きな数値（歩数・距離） |
| headlineSmall | 24sp | Regular | 32sp | セクションタイトル |
| titleLarge | 22sp | Regular | 28sp | 画面タイトル、TopAppBar |
| titleMedium | 16sp | Medium | 24sp | カード・リストアイテムの主テキスト |
| titleSmall | 14sp | Medium | 20sp | ラベル・補助タイトル |
| bodyLarge | 16sp | Regular | 24sp | 本文（説明文等） |
| bodyMedium | 14sp | Regular | 20sp | リスト本文・カード内説明 |
| bodySmall | 12sp | Regular | 16sp | 補足テキスト・タイムスタンプ |
| labelLarge | 14sp | Medium | 20sp | ボタンテキスト |
| labelMedium | 12sp | Medium | 16sp | タブ・チップラベル |
| labelSmall | 11sp | Medium | 16sp | バッジ・最小ラベル |

---

## 数値表示の特別ルール

記録画面では歩数・距離・経過時間を大きく表示するが、フォントスタイルは変更せず **headlineMedium** を使用する。  
数字の幅が変動してもレイアウトが崩れないよう、数値テキストは `fontFeatureSettings = "tnum"` を指定してタブラー数字を使用する。

```kotlin
Text(
    text = "1,234",
    style = MaterialTheme.typography.headlineMedium.copy(
        fontFeatureSettings = "tnum"
    )
)
```
