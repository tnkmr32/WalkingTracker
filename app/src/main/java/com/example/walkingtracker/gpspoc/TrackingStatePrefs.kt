package com.example.walkingtracker.gpspoc

import android.content.Context

/**
 * 記録状態をプロセスをまたいで永続化する薄いラッパー。
 *
 * PoC実機検証（docs/99-others/poc/verification-results-20260922_163720.md 課題3）で、
 * 位置情報権限をフォアグラウンドサービス稼働中に「設定」から剥奪するとOSがアプリプロセスごと
 * 強制終了することが判明した。プロセスが終了した時点でそのプロセス内のコード（例えば
 * GpsTrackingService.checkSelfPermission()ポーリング）は一切実行できないため、剥奪の検知・
 * ユーザーへの通知は「プロセスが再度起動したタイミング」まで待つ以外に方法がない。
 *
 * 本実装（Room の walk_session.finished_at IS NULL による未完了セッション検出、
 * background-tracking.md「権限の検知手段」参照）に相当する仕組みを、Room を持たないPoCでも
 * 検証できるようSharedPreferencesで代替する。
 */
object TrackingStatePrefs {
    private const val PREFS_NAME = "gps_poc_tracking_state"
    private const val KEY_WAS_TRACKING = "was_tracking"
    private const val KEY_LAST_POINT_MILLIS = "last_point_millis"
    private const val KEY_PENDING_MESSAGE = "pending_message"
    private const val KEY_PENDING_MESSAGE_AT = "pending_message_at"

    private fun prefs(context: Context) =
        context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    /** 記録開始に成功した時点で呼ぶ。「記録中のまま終了した」を検出するための起点。 */
    fun markTrackingStarted(context: Context) {
        prefs(context).edit()
            .putBoolean(KEY_WAS_TRACKING, true)
            .remove(KEY_LAST_POINT_MILLIS)
            .apply()
    }

    /** 取得点ごとに最終取得時刻を更新する（プロセスが再起動しても検知手段に不安なく使えるように）。 */
    fun markLastPointMillis(context: Context, timestampMillis: Long) {
        prefs(context).edit()
            .putLong(KEY_LAST_POINT_MILLIS, timestampMillis)
            .apply()
    }

    /** ユーザー操作等による正常停止時に呼ぶ。次回起動時の誤検知を防ぐ。 */
    fun markTrackingStoppedCleanly(context: Context) {
        prefs(context).edit()
            .putBoolean(KEY_WAS_TRACKING, false)
            .remove(KEY_LAST_POINT_MILLIS)
            .apply()
    }

    /** 直前に見た状態が「記録中」のまま、正常停止を経ずに終了しているか。 */
    fun wasTrackingUnexpectedly(context: Context): Boolean =
        prefs(context).getBoolean(KEY_WAS_TRACKING, false)

    /** 記録が途切れる直前に記録できていた最終取得時刻（無ければnull）。 */
    fun consumeLastPointMillis(context: Context): Long? {
        val p = prefs(context)
        val value = p.getLong(KEY_LAST_POINT_MILLIS, -1L)
        return if (value == -1L) null else value
    }

    /** 権限剥奪と判定した際に呼ぶ。プロセスが何度落ちてもユーザーに届くまでメッセージを保持する。 */
    fun markPermissionRevoked(context: Context, atMillis: Long, message: String) {
        prefs(context).edit()
            .putBoolean(KEY_WAS_TRACKING, false)
            .remove(KEY_LAST_POINT_MILLIS)
            .putString(KEY_PENDING_MESSAGE, message)
            .putLong(KEY_PENDING_MESSAGE_AT, atMillis)
            .apply()
    }

    /** 画面表示側が一度だけ消費する。読み出した時点でクリアし、次回起動時に再表示されないようにする。 */
    fun consumePendingRevocationMessage(context: Context): Pair<Long, String>? {
        val p = prefs(context)
        val message = p.getString(KEY_PENDING_MESSAGE, null) ?: return null
        val atMillis = p.getLong(KEY_PENDING_MESSAGE_AT, System.currentTimeMillis())
        p.edit()
            .remove(KEY_PENDING_MESSAGE)
            .remove(KEY_PENDING_MESSAGE_AT)
            .apply()
        return atMillis to message
    }
}
