# アセット定義：旧街道 GeoJSON

参照：[データ設計](../data-design.md) / [踏破判定の実現方式](../../02-architecture-design/highway-traversal.md)

---

## 概要

| 項目 | 内容 |
|------|------|
| 配置パス | `assets/highways/<highway_id>.geojson` |
| フォーマット | GeoJSON（RFC 7946） |
| 用途 | 旧街道のルートデータ。踏破判定と地図表示に使用 |
| 関連業務 | TRV（踏破管理） |
| 関連テーブル | `traversed_segment.highway_id` / `traversed_segment.segment_index` と対応 |

**ファイルパス例**：`assets/highways/tokaido.geojson`

---

## フォーマット

```json
{
  "type": "FeatureCollection",
  "properties": {
    "id": "tokaido",
    "name": "東海道",
    "total_distance_meters": 500000
  },
  "features": [
    {
      "type": "Feature",
      "properties": {
        "segment_index": 0,
        "distance_meters": 2300
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [139.6917, 35.6895],
          [139.7100, 35.6800]
        ]
      }
    }
  ]
}
```

---

## プロパティ定義

### FeatureCollection.properties

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `id` | `String` | ✓ | 旧街道識別子。`traversed_segment.highway_id` と対応 |
| `name` | `String` | ✓ | 旧街道の表示名（例：`東海道`） |
| `total_distance_meters` | `Number` | ✓ | 旧街道の全体距離（メートル）。踏破進捗率の分母に使用 |

### Feature.properties

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `segment_index` | `Number` | ✓ | セグメントの連番（0始まり）。`traversed_segment.segment_index` と対応 |
| `distance_meters` | `Number` | ✓ | セグメントの距離（メートル）。踏破済み距離の合計算出に使用 |

### Feature.geometry

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `type` | `String` | ✓ | 常に `"LineString"` |
| `coordinates` | `Array` | ✓ | 座標の配列。各要素は `[longitude, latitude]`（GeoJSON 標準の経度・緯度順） |

---

## サイズ見積もり（指摘#14対応）

前提：MVPでは旧街道1本（東海道、全長 約500,000m）を対象とする（参照：[要件定義](../../01-requirements/requirements.md)）。実際のセグメント数はGeoJSON作成時の分割粒度（道のカーブへの追従度合い）に依存するため、2パターンで概算する。

| 前提 | セグメント数 | ファイルサイズ（概算） |
|------|------------|---------------------|
| 本ドキュメントのフォーマット例どおり（1セグメント平均2,300m） | 500,000m ÷ 2,300m ≒ 約220セグメント | 1Feature約150バイト（minify後）として約35KB |
| カーブ追従のため細かく分割した場合（1セグメント平均50m） | 500,000m ÷ 50m = 約10,000セグメント | 同様の計算で約1.5MB |

いずれの粒度でも、Androidアプリのassetsとしては軽微なサイズ（数十KB〜数MB程度）であり、アプリバンドルサイズ・起動時メモリへの影響は問題にならないと評価できる。

> **複数の旧街道を追加する場合**：将来的にMVP対象外の追加街道を扱う場合は、1本あたり上記と同オーダーのサイズになる想定で、追加本数に応じて都度再見積もりが必要。

---

## 留意事項

- 各 Feature が1セグメントに対応する
- `coordinates` の順序は `[longitude, latitude]`（GeoJSON 標準）であり、Android の `LatLng(lat, lng)` とは逆順
- アプリ起動時に読み込み、以降はメモリキャッシュを使用する
