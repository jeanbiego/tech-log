# images

Zenn 用の画像を保存するディレクトリです。

- 画像ファイルはリポジトリ直下の `images/` 配下に配置します。
- `images/` 配下は、シリーズ名や記事名ごとにサブディレクトリで整理して構いません。
  - 例: `images/vna-calibration/article-02/solt-kit.png`
- 再利用したい画像があっても `common/` には寄せず、利用する記事ディレクトリ側にコピーして配置します。
- ファイル名は日付ではなく、画像の内容が分かる名前を推奨します。
  - 例: `solt-kit.png`, `reference-plane-solt.png`
- 記事本文からは `/images/...` の絶対パスで参照します。
