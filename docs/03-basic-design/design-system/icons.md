# アイコン・イラスト方針

参照：[デザインシステム](./README.md)

---

## アイコン

### 採用ライブラリ

**Material Icons（`androidx.compose.material:material-icons-extended`）** を使用する。  
カスタムアイコンは作成しない（MVP フェーズ）。

### 使用アイコン一覧

| 用途 | アイコン名 | 備考 |
|------|-----------|------|
| BottomNav：記録タブ | `Icons.Default.DirectionsWalk` | |
| BottomNav：踏破タブ | `Icons.Default.Map` | |
| BottomNav：履歴タブ | `Icons.Default.History` | |
| 記録開始ボタン | `Icons.Default.PlayArrow` | ボタンテキストと併用 |
| 記録停止ボタン | `Icons.Default.Stop` | ボタンテキストと併用 |
| 現在地（マップ外UI） | `Icons.Default.MyLocation` | |
| 歩数 | `Icons.Default.DirectionsWalk` | StatItem のラベルアイコン（任意） |
| 距離 | `Icons.Default.Straighten` | StatItem のラベルアイコン（任意） |
| 経過時間 | `Icons.Default.Timer` | StatItem のラベルアイコン（任意） |
| 戻るボタン | `Icons.AutoMirrored.Default.ArrowBack` | HIS002 TopAppBar |
| エラー | `Icons.Default.ErrorOutline` | Snackbar・ダイアログ |

### サイズルール

| 用途 | サイズ |
|------|--------|
| BottomNavigationBarItem | `24.dp`（デフォルト） |
| ボタン内アイコン | `18.dp` |
| StatItem ラベルアイコン | `16.dp` |
| エラー・情報アイコン | `24.dp` |

---

## イラスト・画像

MVP では以下を除きイラスト・カスタム画像は使用しない。

| 素材 | 形式 | 配置場所 | 備考 |
|------|------|---------|------|
| アプリアイコン | `ic_launcher`（mipmap） | `res/mipmap-*/` | Android Studio の Image Asset でデフォルト生成 |
| 旧街道 GeoJSON | `.geojson` | `assets/` | アイコン・イラストではなく地図データ |

### 将来対応

- 踏破達成時のバッジ・トロフィーイラストは MVP 後のフェーズで検討
- アプリアイコンのカスタムデザインも MVP 後

---

## アクセシビリティ

- すべての `Icon` に `contentDescription` を設定する（装飾目的のみの場合は `null`）
- BottomNavigationBarItem の `label` は省略しない
