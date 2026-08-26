# pte-summit

このリポジトリには、**ビルド不要の静的PWA**が2本入っています。
どちらも GitHub Pages でそのまま配信でき、コンテンツは JSON を編集するだけで増やせます。

| アプリ | パス | 対象 | 内容 |
|---|---|---|---|
| **PTE SUMMIT** | `/` | 本人（43歳） | PTE Academic 79+ 対策トレーナー（日本語UI） |
| **Show Don't Tell — Owl Studio** | `/show/` | 9歳・12歳・43歳 | 英作文の "Show, don't tell" 特訓ゲーム（英語UI） |

2つは**完全に独立**しています。localStorage のキー、Service Worker のスコープ、
manifest（ホーム画面アイコン）はすべて別なので、片方を触ってももう片方は壊れません。

---

## 動かし方

ビルド工程はありません。**静的ファイルを配信するだけ**です。

```bash
# リポジトリ直下で
python3 -m http.server 8000
```

- PTE SUMMIT → http://localhost:8000/
- Owl Studio → http://localhost:8000/show/

Node があるなら `npx serve .` でも `npx http-server .` でも構いません。

> `file://` で直接開くと Service Worker と `content.json` の読み込みが動きません。
> かならず HTTP 経由で開いてください。

### iPhone / iPad にインストールする

Safari で開く → 共有 → **ホーム画面に追加**。
`/` と `/show/` はそれぞれ別アイコンとして追加され、どちらもオフラインで起動します。

---

## Show Don't Tell — Owl Studio

抽象的な「Tell」の文（*He was nervous.*）を、読者に**見える**「Show」の文に書き換える練習をします。

### 3つのレイヤー

| レイヤー | 意味 | 例 |
|---|---|---|
| ✋ **Physical** | 外から見える体の動き | *He gripped the strap until his knuckles turned white.* |
| 🫀 **Internal** | 体の内側の感覚 | *A small cold stone sat at the bottom of his stomach.* |
| 🧠 **Mental** | 思考・注意・記憶・時間感覚 | *He rehearsed his own name three times, just in case.* |

同じ Tell を3レイヤーで書き分ける訓練が、この教材の核です。

### 3人分のモード

プロフィールごとに**語彙・題材・UIの見た目・既定の難易度**が変わります。

| モード | 対象 | 題材 | 既定の難易度 |
|---|---|---|---|
| **Explorer** | 9歳 | 学校・友達・家族・ペット | Guided（ヒント常時表示・5問） |
| **Storyteller** | 12歳 | 試験・部活・友人関係・引っ越し | Standard（ヒントは任意・6問） |
| **Novelist** | 大人 | 仕事・人間関係・記憶・喪失 | Standard / Hard（レイヤーを自分で選ぶ・8問） |

名前とモードは **Settings** でいつでも変更できます。

### 文字サイズ

画面右上に常設の **A- / A+** ボタンがあります。3段階（小・標準・大）で、
端末単位（全プロフィール共通）で保存されます。年齢に関係なく、読みやすさは
その場で調整できます。

### 採点のしくみ

送信すると、5つの軸でルールベース採点されます（**通信不要・即座**）。

| 軸 | 配点 | 見ているもの |
|---|---|---|
| No telling | 25 | 抽象的な感情語をまた使っていないか |
| Body & senses | 20 | 指させる具体的な身体・感覚の名詞があるか |
| Strong verbs | 20 | 動詞が仕事をしているか |
| Layer match | 25 | 指定されたレイヤーで書けているか |
| Craft | 10 | 長さは足りているか、`felt` `very` 等の逃げ language がないか |

採点後にネイティブのお手本が出るので、**自己採点**（同等 / 別解として成立 / 及ばない）で締めます。
70点未満か「及ばない」を選んだ問題は **Review** に溜まり、書き直して70点以上で外れます。

### Progress（分析レポート）

メニューの **📈 Progress** はいつでも開ける振り返り画面です。ただの成績表ではなく、
「今何をすべきか」まで示します。

- **週別の平均スコア推移** — 直近8週を棒グラフで表示し、先週比を `▲ +8` のように明示
- **今週のターゲット** — レビューキューが残っていればそれを最優先で提示、無ければ
  最も弱いレイヤーをボタン1つでそのままセッション開始できる形で提案
- **弱点の具体例** — 「どの軸が弱いか」だけでなく、実際に書いた文とその場面の
  お手本を並べて「どこで落ちたか」を見せる
- **マイスコア推移**（直近24問のスパークライン）・**軸別平均**・**レイヤー別平均**
- **マイルストーン**（10/50/100問達成、streak、平均70+/85+、レイヤー別マスタリー）を
  獲得済み/未獲得のバッジ一覧で表示。次に近いものも分かるので、上達を実感しやすい設計です

### 任意のAIレビュー（Novelistのみ）

Settings で有効にすると、大人モードだけ Anthropic API に1文を送って
詳しい講評（活かすべき表現・直すべき点・書き換え例）を受け取れます。
APIキーはこの端末のブラウザにのみ保存され、PTE SUMMIT と共用します。
**既定はオフで、無効のままでもゲームは全機能が動きます。**

### 進捗とプロフィール

- 進捗は端末の localStorage（キー `show-owl-v1`）に保存されます
- **アップデートで履歴が消えることはありません。** スキーマ移行は加算のみで、
  バージョンが上がるときは移行前の状態を `show-owl-v1-prev` に退避します
- Settings → **Export backup** で全体を JSON に書き出せます。読み込みは**マージ**で、
  端末にある記録を削除しません

#### 別々のiPadを使っている場合（保護者ビュー）

サーバーを持たない設計なので、進捗は端末をまたぎません。子どもの状況を見るには:

1. 子どもの端末で **Progress → Share my progress card** → コードをコピー（またはファイル保存）
2. そのコードを送る（AirDrop / メッセージ / メールなど）
3. 保護者の端末で **Family view → Add a progress card** → 貼り付け

集計値・レイヤー別の得意不得意・直近の作文だけが入った軽い要約で、
どこにもアップロードされません。

### 問題を増やす

`show/content.json` に追記してリロードするだけです。ビルドもデプロイも不要。
形式と、AIに生成させるためのコピペ用プロンプトは [`CONTENT_GUIDE.md`](CONTENT_GUIDE.md) にあります。

---

## PTE SUMMIT

PTE Academic の全セクション79点（Australia PR 相当）を目標にした自主練アプリ。
Write from Dictation / Repeat Sentence / Read Aloud / Essay・SWT / Vocab Sprint / Error Hunt を収録。
問題の追加方法は [`CONTENT_GUIDE.md`](CONTENT_GUIDE.md) を参照してください。

---

## リポジトリ構成

```
├── index.html              PTE SUMMIT 本体（単一ファイル）
├── content.json            PTE SUMMIT の問題
├── manifest.webmanifest    PTE SUMMIT の PWA 設定
├── sw.js                   PTE SUMMIT の Service Worker
├── icon.svg
├── show/
│   ├── index.html          Owl Studio 本体（単一ファイル）
│   ├── content.json        Owl Studio の問題
│   ├── manifest.webmanifest
│   ├── sw.js               scope は /show/ に限定
│   ├── owl.webp            マスコット
│   └── icon-192.png, icon-512.png
├── CONTENT_GUIDE.md        両アプリの問題追加ガイド
└── README.md
```
