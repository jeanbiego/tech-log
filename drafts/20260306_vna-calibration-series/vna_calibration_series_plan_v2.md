# RF測定エンジニアのためのVNA校正シリーズ（企画メモ）

## 目的

このシリーズは、RF測定エンジニア向けに
**VNA校正の理論と実務の橋渡し**を目的として作成する。\
単なる理論説明ではなく、実際の測定環境（基板、RFプローブ、治具、ケーブル等）を想定した内容とする。

対象読者 - RF測定エンジニア - 高周波回路設計者 - SI/PIエンジニア -
半導体測定エンジニア

シリーズの特徴 - 理論（数式）と実務（測定環境）の両方を扱う -
校正方式を体系的に整理 - 実務で困るポイントを解説 -
測定ノウハウ（TIPS）も独立記事として整理

------------------------------------------------------------------------

## シリーズ全体構成

### Part 0 基礎

#### 0-1 VNAとは何を測っているのか

-   Sパラメータとは
-   transmission line
-   port定義

#### 0-2 VNAの基準面（Reference Plane）

独立記事候補

内容 - reference planeとは - 校正による基準面移動 - fixture /
probe測定時の基準面 - port extensionとの関係

#### 0-3 VNAの誤差モデル

独立記事候補

内容 - directivity - source match - load match - reflection tracking -
transmission tracking - isolation - **12-term error model**

図として

port1 ─ error box ─ DUT ─ error box ─ port2

------------------------------------------------------------------------

### Part 1 校正の基本概念

#### 1-1 校正とは何をしているのか

-   error box model
-   測定値と真値
-   error correction

#### 1-2 校正キット

-   open
-   short
-   load
-   thru
-   line

#### 1-3 校正方式の分類

-   SOLT
-   TRL
-   LRM
-   LRRM
-   Multiline TRL

------------------------------------------------------------------------

### Part 2 校正対象ごとの校正方式比較

#### 同軸測定（coaxial measurement）

代表的校正

-   SOLT
-   TRL

特徴 - calibration kitが規格化 - connector repeatabilityが重要

用途

-   RF回路評価
-   ケーブル評価
-   フィルタ測定

------------------------------------------------------------------------

#### プローブ測定（on‑wafer measurement）

対象

-   GSG probe
-   RF probe card
-   wafer measurement

代表的校正

-   LRM
-   LRRM
-   TRL
-   Multiline TRL

特徴

-   open / shortのモデル化が難しい
-   substrate依存
-   probe接触の再現性

------------------------------------------------------------------------

#### 校正方式比較

| 校正方式 | 主用途 | 特徴 |
| --- | --- | --- |
| SOLT | 同軸 | 最も一般的 |
| TRL | 基板 | 高周波に強い |
| LRM | オンウェハ | reflect1個 |
| LRRM | オンウェハ | reflect2個 |
| Multiline TRL | 広帯域 | line複数 |

------------------------------------------------------------------------

### Part 3 SOLT校正

#### 3-1 SOLTの原理

-   Open
-   Short
-   Load
-   Thru

#### 3-2 数式導出

-   error term求解
-   12‑term error model

#### 3-3 SOLTの限界

-   openモデル
-   高周波問題

------------------------------------------------------------------------

### Part 4 TRL校正

#### 4-1 TRLのアイデア

-   Thru
-   Reflect
-   Line

#### 4-2 TRLの数学

-   eigenvalue問題

#### 4-3 Line長さ設計

-   位相条件
-   周波数範囲

#### 4-4 Multiline TRL

-   広帯域化

------------------------------------------------------------------------

### Part 5 LRM / LRRM

#### 5-1 LRM校正

-   line
-   reflect
-   match

#### 5-2 LRRM校正

-   reflect2個の理由
-   probe measurement

#### 5-3 LRRM論文解説

-   pseudo cascading relationship
-   数式展開

------------------------------------------------------------------------

### Part 6 実務RF測定

#### 6-1 Fixture De‑embedding

-   port extension
-   embedding network
-   fixture removal

#### 6-2 プローブ測定

-   GSG probe
-   probe card
-   calibration substrate

------------------------------------------------------------------------

### Part 7 測定TIPS（独立記事シリーズ）

実務ノウハウとして独立記事化する。

#### 7-1 同軸ケーブルの取り扱い

内容 - ケーブルの曲げ - cable stability - 位相変化

#### 7-2 コネクタ再現性

内容 - torque - cleaning - repeatability

#### 7-3 プローブ測定TIPS

内容 - probe contact - scrub - probe alignment

#### 7-4 測定安定化

内容 - 温度 - ケーブル固定 - 測定再現性

------------------------------------------------------------------------

## 想定記事リスト

1.  VNAとは何を測っているのか\
2.  Reference planeとは何か\
3.  VNAの誤差モデル（12‑term model）\
4.  校正とは何をしているのか\
5.  校正方式の分類\
6.  SOLT校正の原理\
7.  TRL校正の原理\
8.  TRL line設計\
9.  LRM / LRRM校正\
10. LRRM論文解説\
11. Multiline TRL\
12. Fixture de‑embedding\
13. On‑wafer measurement\
14. 同軸ケーブル取り扱いTIPS\
15. コネクタ再現性\
16. プローブ測定TIPS

------------------------------------------------------------------------

## このシリーズの特徴

一般資料 → 理論のみ

企業アプリケーションノート → 操作説明中心

本シリーズ → **理論 × 実務 × 測定ノウハウ**

重点テーマ - 校正対象ごとの校正方式 - 同軸 vs プローブ測定 -
測定トラブルと再現性
