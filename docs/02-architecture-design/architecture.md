# アーキテクチャ設計

参照：[要件定義](../01-requirements/requirements.md)

## ドキュメント構成

| ファイル                                           | 内容                                                                 |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| このファイル                                       | システム概要・アーキテクチャパターン・技術スタック・ディレクトリ構成 |
| [background-tracking.md](./background-tracking.md) | バックグラウンドトラッキングの実現方式                               |
| [highway-traversal.md](./highway-traversal.md)     | 旧街道踏破判定の実現方式                                             |
| [permissions.md](./permissions.md)                 | 権限設計                                                             |
| [error-handling.md](./error-handling.md)           | エラーハンドリング方針                                               |
| [logging.md](./logging.md)                         | ログ設計                                                             |

---

## システム概要

スタンドアローン構成のAndroidアプリ。外部サーバーを持たず、すべてのデータを端末内で完結させる。

```
┌────────────────────────────────────┐
│           Android App              │
│                                    │
│  ┌──────────┐   ┌───────────────┐  │
│  │  UI層    │   │ForegroundService│ │
│  │(Compose) │   │  (base層)     │  │
│  └────┬─────┘   └──────┬────────┘  │
│       │                │           │
│  ┌────▼────────────────▼────────┐  │
│  │         ViewModel            │  │
│  └────────────────┬─────────────┘  │
│                   │                │
│  ┌────────────────▼─────────────┐  │
│  │        UseCase層             │  │
│  └────────────────┬─────────────┘  │
│                   │                │
│  ┌────────────────▼─────────────┐  │
│  │    Entity層 (DB / assets)    │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

---

## アーキテクチャパターン

**MVVM（3レイヤー）**

参照：[Android Architecture Guide](https://developer.android.com/topic/architecture)

```
Presentation層  →  UseCase層  →  Entity層
(Screen/ViewModel)  (business logic)  (DB/assets)
```

- PresentationはUseCaseに依存する
- UseCaseはEntityに依存する
- 依存は常に上から下への一方向

---

## 技術スタック

| カテゴリ             | 採用技術                          | 選定理由                                                 |
| -------------------- | --------------------------------- | -------------------------------------------------------- |
| 言語                 | Kotlin                            | プロジェクト既定                                         |
| UIフレームワーク     | Jetpack Compose + Material3       | プロジェクト既定                                         |
| 非同期処理           | Coroutines / Flow                 | Compose・Roomとの親和性                                  |
| ローカルDB           | Room                              | 構造化データの永続化                                     |
| DI                   | Hilt                              | Android公式推奨                                          |
| ナビゲーション       | Navigation Compose                | Compose環境での画面遷移                                  |
| 地図表示             | OSMDroid                          | オフライン動作・APIキー不要                              |
| GPS取得              | FusedLocationProviderClient       | バッテリー効率が高い                                     |
| 歩数取得             | SensorManager (TYPE_STEP_COUNTER) | ハードウェアセンサー・低消費電力                         |
| バックグラウンド処理 | ForegroundService                 | 参照：[background-tracking.md](./background-tracking.md) |
| 踏破判定             | ポイントマッチング（距離閾値50m） | 参照：[highway-traversal.md](./highway-traversal.md)     |
| ルートデータ         | GeoJSONファイル（assets）         | オフライン・サーバー不要                                 |

---

## 業務依存のレイヤー構成

| 層             | 責務                                                                 |
| -------------- | -------------------------------------------------------------------- |
| Presentation層 | 画面表示と状態管理。ViewModelを通じてUseCaseを呼び出す               |
| UseCase層      | ビジネスロジック。歩数・軌跡の記録や踏破進捗の算出などを担う         |
| Entity層       | データの永続化。RoomによるDB操作とassetsのルートデータ読み込みを担う |

---

## ディレクトリ構成

3層のアーキテクチャパターンをトップレベルのディレクトリで表現する。

```
com.example.walkingtracker/
├── presentation/   ← Presentation層：画面・ViewModel
│   └── (機能名)/
├── usecase/        ← UseCase層：ビジネスロジック
├── entity/         ← Entity層：DB・assetsアクセス
│   └── dao/
└── base/           ← 技術基盤（業務ロジック非依存）
    └── service/    ← ForegroundService
```

---

## 必要なパーミッション

| パーミッション                | 用途                                          |
| ----------------------------- | --------------------------------------------- |
| `ACCESS_FINE_LOCATION`        | GPS取得                                       |
| `ACCESS_COARSE_LOCATION`      | GPS取得（fallback）                           |
| `ACTIVITY_RECOGNITION`        | 歩数センサーアクセス                          |
| `FOREGROUND_SERVICE`          | バックグラウンド記録                          |
| `FOREGROUND_SERVICE_LOCATION` | Android 14以降のForegroundService位置情報     |
| `POST_NOTIFICATIONS`          | ForegroundServiceの常駐通知（Android 13以降） |

---

## セキュリティ設計

| 項目         | 方針                                        |
| ------------ | ------------------------------------------- |
| 外部通信     | なし（完全スタンドアローン）                |
| 位置情報     | 端末内のRoomにのみ保存。外部送信しない      |
| 権限         | 上記6つのみ申請。使用目的をManifestに明記   |
| データ暗号化 | MVPでは対象外（端末の標準的な保護に委ねる） |
