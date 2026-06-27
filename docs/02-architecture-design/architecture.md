# アーキテクチャ設計

## システム概要

<!-- アプリ全体の概要を記述 -->

## アーキテクチャパターン

採用パターン: **MVVM（Model-View-ViewModel）**

```
View (Activity / Fragment)
  ↕ observe / event
ViewModel
  ↕
Repository
  ↕
Room Database / DataStore / File
```

## 技術スタック

| カテゴリ | 技術・ライブラリ | 選定理由 |
|----------|----------------|----------|
| 言語 | Kotlin | |
| UIフレームワーク | Jetpack Compose / View | |
| アーキテクチャ | MVVM + Clean Architecture | |
| 非同期処理 | Coroutines / Flow | |
| ローカルDB | Room | |
| 軽量KVストア | DataStore (Preferences) | |
| DI | Hilt | |
| ナビゲーション | Navigation Component | |

## レイヤー構成

| レイヤー | 説明 | 主なクラス |
|----------|------|-----------|
| Presentation | UIと状態管理 | Activity, Fragment, Composable, ViewModel |
| Domain | ビジネスロジック | UseCase, Repository interface |
| Data | データアクセス | RepositoryImpl, DAO, DataStore |

## ローカルデータ管理方針

| データ種別 | 保存先 | 用途 |
|-----------|--------|------|
| 構造化データ | Room Database | メインデータ |
| 設定・フラグ | DataStore | ユーザー設定 |
| ファイル | Internal Storage | 画像・エクスポートファイルなど |

## パッケージ構成

```
com.example.app/
├── data/
│   ├── local/
│   │   ├── dao/
│   │   ├── entity/
│   │   └── database/
│   └── repository/
├── domain/
│   ├── model/
│   ├── repository/
│   └── usecase/
└── presentation/
    ├── screen/
    └── component/
```

## セキュリティ設計

<!-- データ保護・権限管理などを記述 -->

| 項目 | 方針 |
|------|------|
| 権限 | 必要最小限のAndroid権限のみ申請 |
| データ暗号化 | |
| 外部送信 | なし |
