package com.example.walkingtracker.gpspoc

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager

/**
 * 現在のバッテリー残量（%）をstickyブロードキャストから取得する。
 * 検証項目4（バッテリー消費）の開始時・現在値の記録に使用。
 */
fun readBatteryPercent(context: Context): Int? {
    val intent: Intent = context.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
        ?: return null
    val level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
    val scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
    if (level < 0 || scale <= 0) return null
    return (level * 100) / scale
}
