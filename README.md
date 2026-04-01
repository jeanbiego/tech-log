# tech-log

Zenn + GitHub 連携で、下書きから公開記事までを継続運用するためのリポジトリです。

## セットアップ

```bash
npm install
npm run dev
```

## npm scripts

- `npm run dev`: Zenn preview を起動
- `npm run new:article`: 新規記事の作成
- `npm run new:book`: 新規本の作成
- `npm run lint`: Markdown lint + 数式区切り + Zenn 記事ルール検証

## 執筆フロー

1. `drafts/<yyyymmdd>_<topic>/draft.md` で下書きを作成
2. preview 用に `articles/_draft-<final-slug>.md` を生成し `published: false` を設定
3. `published: true` にする前に、正式 slug (`howto-*`, `paper-*`, `repro-*`) へ昇格する
4. 公開後は slug を変更しない。Zenn では別記事として扱われる
5. PR を作成し CI 通過後に `main` へマージ

## slug ルール

- 正式 slug は `howto-*` / `paper-*` / `repro-*`
- 使用可能文字は英小文字・数字・ハイフンのみ
- Zenn の制約に合わせて 12〜50 文字にする
- preview 記事は `_draft-<final-slug>.md` 形式にする
- 公開済み記事の slug を変えたい場合は、新規記事扱いになることを前提に Zenn ダッシュボード側の整理も行う

## 画像/動画ルール

- 本文: `articles/<slug>.md`
- 画像: `images/<series-or-article>/figure-01.png`
- 本文からは `/images/...` の絶対パスで参照
- 動画は YouTube 等の外部ホスティングのみ

## ブランチ保護（GitHub 側で要設定）

- `main` への PR 必須
- CI 成功必須
- force push 禁止
- ブランチ削除禁止
- レビュー必須は任意（この運用では必須にしない）

## ライセンス

- コード/設定: MIT (`LICENSE`)
- 記事本文/画像: CC BY 4.0 (`CONTENT_LICENSE.md`)
