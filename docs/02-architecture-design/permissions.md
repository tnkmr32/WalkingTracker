# 権限設計

参照：[基本設計](./basic-design.md) / [アーキテクチャ設計](../02-architecture-design/architecture.md#必要なパーミッション)

---

## 権限一覧

| 権限 | 用途 | 取得タイミング |
|------|------|--------------|
| `ACCESS_FINE_LOCATION` | GPS 取得 | アプリ起動時（PermissionScreen） |
| `ACCESS_COARSE_LOCATION` | GPS 取得（fallback） | `ACCESS_FINE_LOCATION` と同時 |
| `ACTIVITY_RECOGNITION` | 歩数センサーアクセス | アプリ起動時（PermissionScreen） |
| `FOREGROUND_SERVICE` | バックグラウンド記録 | AndroidManifest 宣言のみ（ユーザーへの許可ダイアログ不要） |
| `FOREGROUND_SERVICE_LOCATION` | Android 14 以降の ForegroundService 位置情報 | AndroidManifest 宣言のみ |
| `POST_NOTIFICATIONS` | ForegroundService の常駐通知（Android 13 以降） | アプリ起動時（PermissionScreen） |

---

## PermissionScreen で説明する権限

ユーザー操作が必要な権限のみ PermissionScreen に表示する。

| 権限 | 説明文（ユーザー向け） |
|------|----------------------|
| `ACCESS_FINE_LOCATION` / `ACCESS_COARSE_LOCATION` | 歩行中の位置情報を記録するために使用します |
| `ACTIVITY_RECOGNITION` | 歩数を計測するために使用します |
| `POST_NOTIFICATIONS` | バックグラウンドで記録中であることを通知するために使用します |

参照：[screens/permission.md](./screens/permission.md)
