# 詳細設計

## ViewModel設計

### ViewModel一覧

| ViewModel名 | 対応画面 | 保持する状態 |
|------------|---------|------------|
| | | |

### ViewModel詳細

#### `XxxViewModel`

**UiState**

```kotlin
data class XxxUiState(
    val isLoading: Boolean = false,
    // ...
)
```

| 関数名 | 処理概要 |
|--------|---------|
| | |

## UseCase設計

| UseCase名 | 責務 |
|----------|------|
| | |

## Repository設計

| Repository | 利用先 | データソース |
|-----------|--------|------------|
| | | Room / DataStore / File |

## Room Database設計

### テーブル: `table_name`

```kotlin
@Entity(tableName = "table_name")
data class XxxEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    // ...
)
```

| カラム名 | 型 | NOT NULL | デフォルト値 | 説明 |
|---------|-----|----------|------------|------|
| id | Long | ✓ | autoGenerate | |
| | | | | |

### インデックス

| テーブル | カラム | 目的 |
|---------|-------|------|
| | | |

### マイグレーション方針

<!-- スキーマ変更時の対応方針を記述 -->

## シーケンス設計

### [ユースケース名]

```
[シーケンス図をここに記述]
```

## バリデーション設計

| 項目 | ルール | エラーメッセージ |
|------|--------|---------------|
| | | |

## テスト方針

| テスト種別 | 対象 | ツール |
|-----------|------|--------|
| 単体テスト | ViewModel / UseCase / Repository | JUnit4, MockK |
| DBテスト | Room DAO | AndroidX Test |
| UIテスト | 主要画面 | Espresso / Compose UI Test |
