# CONTRIBUTING

## 基本方針

- すべて PR 経由で `main` に取り込む
- CI（markdownlint + 数式チェック）を通してからマージする
- 記事本文の `.md` は `articles/` 直下に置く

## slug 命名規則

- HowTo: `howto-<tool>-<task>`
- 論文まとめ: `paper-<firstauthor>-<year>-<keyword>`
- 追試: `repro-<paperkey>-<topic>`

使用可能文字は英小文字・数字・ハイフンのみ。

## 下書き運用

- 下書きは `drafts/<yyyymmdd>_<topic>/draft.md`
- preview 記事は `articles/_draft-<slug>.md`
- preview 記事の front matter は `published: false` にする

## emoji ルール

- 論文まとめ: 📄
- 追試: 🧪
- HowTo: 🛠️

## 画像ルール

- 画像は `articles/<slug>/images/` に配置
- `figure-01.png` 形式の連番を使う
- 本文から相対パスで参照する

## テンプレート

`templates/` のテンプレートを起点に執筆してください。
