## 概要

越境ECサイト bibin-shopは、[Spree Commerce](https://spreecommerce.org/)をベースにしたECサイトです。

## インストール方法

### pnpm インストール

`curl -fsSL https://get.pnpm.io/install.sh | sh -`

以下のコマンドで関連するライブラリをインストールします。

```bash
pnpm i
```

## 環境変数の設定

`.env.example`から`.env.local`をコピーし、以下の環境変数を設定します。

```bash
cp .env.example .env.local
```

## 起動方法

以下のコマンドでアプリケーションを起動します。

```bash
pnpm dev
```

[localhost:4000](http://localhost:4000) でトップ画面が開けます。

