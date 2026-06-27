GitHubにIssueを作成するスキルです。

## 使い方

```
/create-issue
```

引数なしで実行するとタイトルと内容をインタラクティブに入力できます。
引数にタイトルを渡すこともできます: `/create-issue タイトル名`

## 手順

1. Issueのタイトルが引数 `$ARGUMENTS` に指定されていれば使用する。なければユーザーにタイトルを確認する。
2. Issueの内容（概要・タスク内容・完了条件）をユーザーに確認するか、引数から推測して草案を作成し確認を取る。
3. リポジトリのエンドポイントは環境変数 `$GITHUB_REPO` を使用する。
4. 以下のコマンドでIssueを作成する:

```bash
gh issue create --repo "$GITHUB_REPO" --title "タイトル" --body "本文"
```

5. 作成されたIssueのURLをユーザーに伝える。

## 注意事項

- `$GITHUB_REPO` は `.claude/settings.local.json` の `env` に定義する（git管理外）
- `gh` コマンドが認証済みであること（`gh auth login` で設定）
