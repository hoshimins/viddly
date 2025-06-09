# Viddly

動画共有プラットフォーム - モダンなUIとダークモード対応の動画アップロード・視聴アプリケーション

## 概要

Viddlyは、動画のアップロード、管理、視聴ができるウェブアプリケーションです。  
モノレポ構成でフロントエンドとバックエンドを分離し、モダンなUIとダークモード対応を実装しています。

## 技術スタック

### フロントエンド
- **Next.js 14** (App Router)
- **React 18** 
- **TypeScript**
- **Tailwind CSS 4.x** (モダンなデザインシステム)
- **Radix UI** (アクセシブルなUIコンポーネント)
- **Lucide React** (アイコン)
- **Uppy** (ファイルアップロード)

### バックエンド
- **Hono** (高速なWebフレームワーク)
- **Prisma ORM** (データベースアクセス)
- **PostgreSQL** (データベース)
- **TypeScript**

### インフラ・ツール
- **pnpm** (パッケージマネージャー)
- **Biome** (リンター・フォーマッター)

## 主な機能

- 📹 **動画アップロード** - プログレス表示付きの直感的なアップロード
- 🎬 **動画視聴** - レスポンシブな動画プレイヤー
- 🎨 **モダンUI** - グラス効果とアニメーションを含むモダンなデザイン
- 🌙 **ダークモード** - ライト/ダークモードの切り替え対応
- 📱 **レスポンシブ** - モバイルファーストのレスポンシブデザイン
- 🔍 **動画検索** - 動画の検索・フィルタリング機能

## 開発環境のセットアップ

### 前提条件
- Node.js 18以上
- pnpm
- PostgreSQL

### インストール

```bash
# プロジェクトのクローン
git clone <repository-url>
cd viddly

# 依存関係のインストール
pnpm install
```

### 環境変数の設定

```bash
# ルートディレクトリに.envファイルを作成
cp .env.example .env

# 必要な環境変数を設定
DATABASE_URL="postgresql://username:password@localhost:5432/viddly"
```

## 開発コマンド

```bash
# フロントエンド開発サーバーを起動
pnpm dev:frontend

# バックエンド開発サーバーを起動  
pnpm dev:backend

# 両方を同時に起動
pnpm dev

# 全体のビルド
pnpm build
```

## プロジェクト構成

```
viddly/
├── apps/
│   ├── frontend/           # Next.js フロントエンド
│   │   ├── app/           # App Router ページ
│   │   ├── components/    # Reactコンポーネント
│   │   ├── contexts/      # React Context（テーマ管理など）
│   │   ├── lib/          # ユーティリティ関数
│   │   └── styles/       # Tailwind CSS設定
│   └── backend/           # Hono バックエンド
│       ├── src/          # ソースコード
│       │   ├── app/      # コントローラー・ルート・サービス
│       │   ├── middleware/ # ミドルウェア
│       │   └── utils/    # ユーティリティ
│       └── prisma/       # データベース設定・マイグレーション
├── infra/                 # インフラ設定
├── packages/              # 共通パッケージ
└── CLAUDE.md             # Claude Code用ドキュメント
```

## デザインシステム

### カラーシステム
- **プライマリ**: モダンなブルー系グラデーション
- **セカンダリ**: ニュートラルなグレー系
- **アクセント**: バイオレット系

### コンポーネント
- **Glass Effect**: `backdrop-filter: blur(12px)` を使用した透明感のあるUI
- **Card Shadow**: 立体感のあるカードデザイン
- **Gradient Background**: 美しいグラデーション背景

### アニメーション
- **Fade In**: スムーズなフェードイン効果
- **Slide In**: 左からのスライドイン効果
- **Theme Transition**: テーマ切り替え時のアニメーション

## データベース

### 主要なテーブル
- **users**: ユーザー情報
- **videos**: 動画メタデータ
- **関連テーブル**: いいね、コメント等（今後追加予定）

### マイグレーション

```bash
# バックエンドディレクトリで実行
cd apps/backend
pnpm prisma migrate dev
pnpm prisma generate
```

## 環境変数

プロジェクトのルートにある `.env` ファイルで以下を設定：

```env
DATABASE_URL="postgresql://username:password@localhost:5432/viddly"
# 他の必要な環境変数...
```

テンプレートは `.env.example` に記載されています。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
