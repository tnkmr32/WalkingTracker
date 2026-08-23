# UIコンポーネントセット

参照：[デザインシステム](./README.md)

---

## 方針

**アトミックデザイン**を採用し、UI を Atoms → Molecules → Organisms → Templates → Pages の5階層で構成する。  
各階層は下位階層のコンポーネントを組み合わせて構築する。

| 階層 | 定義 | 本ドキュメントでの要素 |
|---|---|---|
| **Atoms**（原子） | それ以上分解しても意味をなさないUIの最小単位 | Icon / Label / Headline / FilledButton / OutlinedButton / TextButton / LinearProgressBar / CircularProgressIndicator / Divider / Badge |
| **Molecules**（分子） | Atoms を組み合わせた、ひとつの役割を持つ小さなUIユニット | MetricItem / LabeledProgressItem / SummaryRow / DualStateButton / NavigationTab / LocationMarker |
| **Organisms**（有機体） | Molecules・Atoms を組み合わせ、ページの一領域を担う自己完結したUIブロック | BottomNavigationBar / StatPanel / RecordControlSection / SessionCard / SessionList / TraversalSummarySection / MapArea / TopBar / ConfirmDialog / SnackbarArea |
| **Templates**（テンプレート） | コンテンツを持たず、Organisms の配置ルールを定義するページ骨格 | TabNavigationTemplate / MapOverlayTemplate / DetailTemplate |
| **Pages**（ページ） | Templates に Organisms を配置した実際の画面 | [画面設計](../screens/) を参照 |

---

## Atoms（原子）

UIの最小単位。それ以上分解しても意味をなさない要素。

| コンポーネント | 説明 |
|---|---|
| **Icon** | ナビゲーション・アクション用のアイコン（24dp 正方形） |
| **Label** | 補足テキスト（単位・項目名等の小さな文字列） |
| **Headline** | 数値・タイトル等の強調テキスト |
| **FilledButton** | 最重要アクション用の塗りつぶしボタン |
| **OutlinedButton** | セカンダリアクション用の枠線ボタン |
| **TextButton** | ダイアログ内のキャンセル等、最軽量のボタン |
| **LinearProgressBar** | 踏破率など割合を水平バーで示す |
| **CircularProgressIndicator** | ローディング中を示す回転インジケーター |
| **Divider** | 区切り線 |
| **Badge** | 数値や状態を示す小さな丸ラベル |

---

## Molecules（分子）

Atoms を組み合わせた、ひとつの役割を持つ小さなUIユニット。

| コンポーネント | 説明 |
|---|---|
| **MetricItem** | 数値とその項目名をペアで縦に並べた計測値表示ユニット |
| **LabeledProgressItem** | ラベル・値・プログレスバーをまとめた1行の進捗表示ユニット |
| **SummaryRow** | プライマリ情報と複数のサブ情報を2行にまとめた概要行 |
| **DualStateButton** | 2つの状態を持ち、状態に応じて外観とラベルを切り替えるボタン |
| **NavigationTab** | アイコンとラベルをペアにしたボトムナビゲーションの1タブ項目 |
| **LocationMarker** | 地図上の位置を示す中心アイコンと精度を表す半透明円からなるマーカー |

---

## Organisms（有機体）

Molecules・Atoms を組み合わせ、ページの一領域を担う自己完結したUIブロック。

| コンポーネント | 説明 |
|---|---|
| **BottomNavigationBar** | 3つの NavigationTab を横並びにしたアプリ共通のタブバー |
| **StatPanel** | 複数の MetricItem を横並びにしたリアルタイム数値表示エリア |
| **RecordControlSection** | StatPanel と DualStateButton を縦に並べた操作の中心エリア。地図の手前にオーバーレイする |
| **SessionCard** | SummaryRow をカード形状で包んだ一覧の1項目。タップで詳細へ遷移する |
| **SessionList** | SessionCard を垂直方向に並べたスクロール可能な一覧 |
| **TraversalSummarySection** | 複数の LabeledProgressItem を縦に並べた進捗一覧エリア。地図の手前にオーバーレイする |
| **MapArea** | 地図タイル・踏破レイヤー・軌跡レイヤー・LocationMarker を重ねた地図表示ブロック |
| **TopBar** | 戻るアイコンと画面タイトルで構成される詳細画面の上部バー |
| **ConfirmDialog** | 破壊的・不可逆なアクション前に確認を取るモーダル。記録停止時に使用する |
| **SnackbarArea** | エラー・成功通知を画面下部に一時表示する領域 |

---

## Templates（テンプレート）

ページのレイアウト骨格。コンテンツを持たず、Organisms の配置ルールを定義する。

| テンプレート | 説明 |
|---|---|
| **TabNavigationTemplate** | BottomNavigationBar を画面下部に固定し、その上にコンテンツエリアを配置する基本レイアウト。記録・踏破・履歴の3画面で共用する |
| **MapOverlayTemplate** | MapArea を全画面に敷き、その手前にコントロールパネルをオーバーレイするレイアウト。記録・踏破画面で使う |
| **DetailTemplate** | TopBar を上部に固定し、その下にスクロール可能なコンテンツエリアを配置するレイアウト。記録詳細画面で使う |

---

## Pages（ページ）

Templates に Organisms を配置した実際の画面。各画面の定義は画面設計書を参照。

参照：[画面設計](../screens/)
