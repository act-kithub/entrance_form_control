# entrance_form_control

## これは何？

KINDAI Info-Tech HUBの入会フォームに回答があった際にDiscordに通知を送るためのGAS

## 使い方

### 初期設定

> [!NOTE]
> nodejsがインストールされていることが前提です

```shell
# プロジェクトのクローン
git clone git@github.com:act-kithub/entrance_form_control.git

# プロジェクトのディレクトリに移動
cd entrance_form_control

# 依存関係のインストール
npm install

# claspへのログイン
clasp login
# -> ブラウザが開くのでGoogleアカウントでログイン
# -> GASプロジェクトへのアクセス権を持つアカウント（大体はkindai.ac.jpアカウント）でログインしてください
```

### 修正後のpush
```shell
# push
clasp push
# -> Forbiddenが出てきたら https://script.google.com/home/usersettings でAPIを有効にしてください
```