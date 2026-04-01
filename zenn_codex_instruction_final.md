# Codex指示書：Zenn × GitHub 記事執筆リポジトリ初期設定

## 目的

Zenn の GitHub 連携で記事を継続的に増やすためのリポジトリを、`zenn init`
から新規構築する。 運用は「下書き → 記事化 →
清書」の分業が回り、数式・画像・外部動画埋め込みに対応できること。

------------------------------------------------------------------------

## 前提

-   新規リポジトリとして作成し、`zenn init` から構築する。
-   記事本文の `.md` は `articles/` 直下に置く。
-   画像は記事単位で管理する。
-   PR必須運用。
-   軽量CI（markdownlint + 数式閉じ忘れ検知）を導入する。

------------------------------------------------------------------------

## ディレクトリ構成

-   `articles/`：Zenn公開記事（本文mdは直下）
-   `books/`：空で残す
-   `drafts/`：ユーザー下書き
    -   `drafts/<yyyymmdd>_<topic>/draft.md`
    -   `drafts/<yyyymmdd>_<topic>/assets/`
-   `notes_public/`：公開可能な作業ログ
-   `notes_private/`：ローカル専用（.gitignore対象）
-   `templates/`：記事テンプレ（3種）
-   `.github/`：Issue / PRテンプレ
-   `README.md`
-   `CONTRIBUTING.md`
-   `CONTENT_LICENSE.md`
-   `LICENSE`

------------------------------------------------------------------------

## 下書きのpreview運用

-   ユーザーは `drafts/` に下書きを置く。
-   Codexは下書きから `articles/_draft-<final-slug>.md` を生成する。
-   `published: false` とする。
-   `published: true` にする前に正式slugへ昇格する。
-   公開後のslug変更は別記事扱いになるため行わない。

------------------------------------------------------------------------

## slug命名規則

-   HowTo：`howto-<tool>-<task>`
-   論文まとめ：`paper-<firstauthor>-<year>-<keyword>`
-   追試：`repro-<paperkey>-<topic>`

英小文字 + 数字 + ハイフンで統一。
Zenn の制約に合わせて 12〜50 文字とする。

------------------------------------------------------------------------

## emojiルール

-   論文まとめ：📄
-   追試：🧪
-   HowTo：🛠️

------------------------------------------------------------------------

## 画像ルール

-   本文：`articles/<slug>.md`
-   画像：`images/<series-or-article>/figure-01.png`
-   連番で命名
-   `/images/...` の絶対パスで参照

------------------------------------------------------------------------

## 動画ルール

-   外部ホスティング（YouTube等）を使用
-   リポジトリ内に動画ファイルは置かない

------------------------------------------------------------------------

## ライセンス

-   `LICENSE`：MIT（コード・設定）
-   `CONTENT_LICENSE.md`：CC BY 4.0（記事本文・画像）

------------------------------------------------------------------------

## GitHub運用

-   main ブランチ保護
    -   PR必須
    -   CI必須
    -   force push禁止
    -   削除禁止
-   レビュー必須は設定しない

------------------------------------------------------------------------

## GitHub Actions

-   markdownlint
-   `$` / `$$` の閉じ忘れ検知（軽量チェック）
-   Zenn記事ルール検証（front matter / draft運用 / 正式slug / 公開済みslug rename検知）

------------------------------------------------------------------------

## テンプレート

`templates/` に以下を作成：

-   paper-summary.md
-   repro-log.md
-   howto.md

全テンプレに以下を含む：

-   TL;DR
-   前提 / 対象読者
-   本文
-   参考文献（必須）

------------------------------------------------------------------------

## Codexが作成する成果物

-   package.json（zenn-cli、dev / new:article / lint）
-   .gitignore（node_modules, notes_private含む）
-   README.md
-   CONTRIBUTING.md
-   CONTENT_LICENSE.md
-   LICENSE
-   templates/\*.md
-   .github/ISSUE_TEMPLATE/\*
-   .github/pull_request_template.md
-   サンプル下書き + preview記事 + 画像

------------------------------------------------------------------------

## 仕上げ確認

-   npm install → npm run dev が動作する
-   画像表示確認
-   CI通過確認
-   PR経由でのみmainにマージ可能
