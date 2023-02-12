# ポケモンしりとり

haroot が作成したポケモンしりとり SPA。

## 技術要素

| 技術       | バージョン    | 説明                          |
| ---------- | ------------- | ----------------------------- |
| TypeScript | 4.9.4         | 開発言語                      |
| React      | 18.2.0        | Js 用ライブラリ               |
| Next.js    | 13.1.2        | フレームワーク                |
| Bootstrap  | 5.2.3         | CSS テンプレート              |
| PokéAPI    | -             | ポケモン非公式 API            |
| MySQL      | 8.0.27-8.0.28 | データベース                  |
| ssh2       | 1.11.0        | ssh 接続用の npm モジュール   |
| lru-cache  | 7.14.1        | キャッシュ用の npm モジュール |

<br>

## 環境構築

※このプロジェクトでは、dev 環境の場合ローカルの mysql、prod 環境の場合 RDS 内にある mysql を使用しています。<br>
<br>
DB 接続パラメータを環境変数に記載<br>
(`{}`内は使用するパラメータに書き換えてください)

```sh
cat << EOF >> .env
# dev環境では不要
SSH_HOST={ssh_host}
SSH_USER={ssh_user}
SSH_PORT={ssh_port}

# 必須パラメータ
MYSQL_HOST={db_host}
MYSQL_USER={db_user}
MYSQL_PASSWORD={db_password}
MYSQL_DATABASE={db_database}
MYSQL_PORT={db_port}
EOF
```

ssh する場合、ssh 元に接続するためのパスワード情報も必須です。

```sh
cat << EOF >> ssh_client2.pem
{パスワード情報}
EOF
```

モジュールのインストール

```sh
npm install
```

<br>

# 起動

```sh
npm run dev
```
