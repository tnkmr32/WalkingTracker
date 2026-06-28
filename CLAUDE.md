# CLAUDE.md

このファイルは、リポジトリ内のコードを操作する際に Claude Code (claude.ai/code) へ向けたガイダンスを提供します。

## ビルドと実行

```bash
# デバッグ APK をビルド
./gradlew assembleDebug

# 接続済みデバイス/エミュレーターにインストール
./gradlew installDebug

# ユニットテストを実行
./gradlew test

# 特定のユニットテストクラスを実行
./gradlew test --tests "com.example.walkingtracker.ExampleUnitTest"

# インストルメンテッドテスト（実機）を実行
./gradlew connectedAndroidTest

# Lint
./gradlew lint
```

## プロジェクト概要

**Jetpack Compose** + Material3 を使ったシングルモジュール Android アプリ（`app/`）。現時点では白紙の状態で、`MainActivity` はプレースホルダーの "Hello Android" 画面を表示するのみ。目標機能は歩行・歩数トラッカー。

- **minSdk 33**（Android 13）、**targetSdk 36**
- **AGP 9.1.1**、**Kotlin 2.2.10**、**Compose BOM 2024.09.00**
- 依存関係のバージョンはすべて `gradle/libs.versions.toml` で一元管理

## アーキテクチャ

アプリは単一の `ComponentActivity` を持ち、Compose が UI レイヤーを担う。テーマ（`ui/theme/`）はダイナミックカラー（Android 12+）、ダークモード、フォールバック用の静的カラースキームに対応済み。

機能追加時に想定されるパターン：
- 状態管理には `ViewModel`（`lifecycle-viewmodel-compose` 経由）— 依存関係はまだ未追加
- 歩数計測には `SensorManager` または Health Connect を使用し、`ACTIVITY_RECOGNITION` パーミッションをマニフェストに追加
- 複数画面が必要な場合は `NavHost` で Compose 画面を接続

## 主要ファイル

| ファイル | 役割 |
|---|---|
| `app/src/main/java/…/MainActivity.kt` | エントリーポイント。プレースホルダーをここで置き換える |
| `app/src/main/AndroidManifest.xml` | パーミッション（例: `ACTIVITY_RECOGNITION`）の追加先 |
| `app/src/main/java/…/ui/theme/` | テーマ・カラー・タイポグラフィ |
| `gradle/libs.versions.toml` | 全依存関係とプラグインのバージョン管理 |
| `app/build.gradle.kts` | モジュールレベルのビルド設定 |
