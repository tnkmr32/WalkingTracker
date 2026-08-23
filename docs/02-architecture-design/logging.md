# ログ設計

参照：[基本設計](./basic-design.md)

---

## 基本方針

| 項目 | 方針 |
|------|------|
| ログレベル | `Debug` / `Info` / `Warning` / `Error` の4段階 |
| 出力先 | Logcat（デバッグビルドのみ出力。リリースビルドでは Info 以下を抑制） |
| 個人情報 | GPS 座標・歩数をログに含めない |
| タグ規則 | クラス名または機能名をタグとして使用（例: `WalkingService`, `TraversalUseCase`） |

---

## ログ対象一覧

| ログ対象 | レベル | 内容 |
|---------|--------|------|
| ForegroundService 起動・停止 | Info | サービスの開始・終了 |
| GPS 取得失敗 | Warning | `LocationResult` が null の場合 |
| 踏破判定実行 | Debug | 判定対象セグメント数、踏破済み追加件数 |
| DB 操作エラー | Error | 例外メッセージ（座標データは除く） |
| GeoJSON 読み込みエラー | Error | 例外メッセージ |
