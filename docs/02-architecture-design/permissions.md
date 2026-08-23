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

## 業務別の権限要否（指摘#13対応）

TRV・HIS は Room DB / GeoJSON asset を読むだけで、位置情報・歩数センサーへのライブアクセスを行わないため、権限の有無に関わらず常に開ける。権限が必要になるのは実質 WLK（記録開始時）のみ。

| 業務 | 必要な権限 | 権限がない場合の挙動 |
|------|-----------|------------------|
| WLK（記録開始時） | `ACCESS_FINE_LOCATION` / `ACTIVITY_RECOGNITION`（任意・歩数0で継続） / `POST_NOTIFICATIONS` | 「記録を開始する」ボタン押下時に権限を再チェックし、不足があれば SET001 へ遷移する（参照：[business-logic-design.md](../03-basic-design/business-logic-design.md)） |
| TRV | なし | 常に閲覧可能（対象外） |
| HIS | なし | 常に閲覧可能（対象外） |

記録中に権限が剥奪された場合の挙動は [error-handling.md](./error-handling.md) を参照。

---

## PermissionScreen で説明する権限

ユーザー操作が必要な権限のみ PermissionScreen に表示する。

| 権限 | 説明文（ユーザー向け） |
|------|----------------------|
| `ACCESS_FINE_LOCATION` / `ACCESS_COARSE_LOCATION` | 歩行中の位置情報を記録するために使用します |
| `ACTIVITY_RECOGNITION` | 歩数を計測するために使用します |
| `POST_NOTIFICATIONS` | バックグラウンドで記録中であることを通知するために使用します |

参照：[screens/SET001-permission.md](./screens/SET001-permission.md)
