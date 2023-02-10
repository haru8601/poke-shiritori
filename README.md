# ポケモンしりとり

haroot が作成したポケモンしりとり SPA。

## 技術要素

| 技術       | バージョン | 説明               |
| ---------- | ---------- | ------------------ |
| TypeScript | 4.9.4      | 開発言語           |
| React      | 18.2.0     | Js 用ライブラリ    |
| Next.js    | 13.1.2     | フレームワーク     |
| Bootstrap  | 5.2.3      | CSS テンプレート   |
| PokéAPI    | -          | ポケモン非公式 API |

<br>

## 環境構築

DB 接続パラメータを環境変数に記載
<br>
({}内は使用する DB 情報に書き換えてください)

```sh
cat << EOF >> .env
MYSQL_HOST={host}
MYSQL_USER={user}
MYSQL_PASSWORD={password}
MYSQL_DATABASE={database}
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
