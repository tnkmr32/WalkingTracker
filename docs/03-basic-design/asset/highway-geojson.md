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
        "segment_index": 0
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

### Feature.geometry

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `type` | `String` | ✓ | 常に `"LineString"` |
| `coordinates` | `Array` | ✓ | 座標の配列。各要素は `[longitude, latitude]`（GeoJSON 標準の経度・緯度順） |

---

## 留意事項

- 各 Feature が1セグメントに対応する
- `coordinates` の順序は `[longitude, latitude]`（GeoJSON 標準）であり、Android の `LatLng(lat, lng)` とは逆順
- アプリ起動時に読み込み、以降はメモリキャッシュを使用する
