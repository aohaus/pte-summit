# コンテンツ拡充ガイド

このリポジトリの2つのアプリは、どちらも「枠組み(index.html)」と「コンテンツ(content.json)」が
分離されています。問題を増やすときは **content.json に追記するだけ** です。

- **PTE SUMMIT** → `content.json`（このページの前半）
- **Show Don't Tell — Owl Studio** → `show/content.json`（このページの後半）

---

# PTE SUMMIT (`content.json`)

このアプリは「枠組み(index.html)」と「コンテンツ(content.json)」が分離されています。
問題を増やすときは **content.json に追記するだけ** で、index.html の変更は不要です。

## 仕組み

- アプリは起動時に同じフォルダの `content.json` を読み込み、内蔵問題とマージします(重複は自動除外)
- `content.json` が無い・壊れている場合でも、内蔵問題だけで正常に起動します
- 更新手順: GitHubで content.json を編集 → Commit → アプリをリロード

## content.json の形式

```json
{
  "wfd":   ["Write from Dictation の文", "..."],
  "rs":    ["Repeat Sentence の文", "..."],
  "swt":   ["Summarize Written Text のパッセージ(100〜150語)", "..."],
  "essay": ["エッセイのプロンプト", "..."],
  "ra":    ["Read Aloud のパッセージ(50〜65語)", "..."],
  "grammar": [{"s":"誤りを含む文", "wrong":"誤り語句", "c":["正しい形","誤り1","誤り2","誤り3"], "a":0, "why":"why it is correct (English)", "cat":"Adjective vs Adverb", "lv":2}]
}
```

注意: JSONの文字列内で二重引用符 `"` は使わない(使う場合は `\"` にエスケープ)。
最後の要素の後ろにカンマを付けない。

## 各タスクの問題作成基準(PTE 79+レベル)

- **wfd**: 学術的な場面(講義・研究・大学生活)、10〜16語、自然な話し言葉。
  複数形・冠詞・数字・学術語彙など聞き取りの引っかけを含める
- **rs**: 大学のアナウンス調、8〜13語、一息で言える長さ
- **swt**: アカデミックな評論文、100〜150語、主張+根拠+対立意見の構造を持つ1段落
- **essay**: PTE頻出形式(Discuss both views / To what extent do you agree / advantages-disadvantages)、
  教育・テクノロジー・都市・環境・労働などの定番テーマ
- **ra**: Read Aloud用パッセージ。50〜65語の1段落、アカデミックな説明文。
  読み上げ練習に適した自然な文構造で、固有名詞は控えめに
- **grammar**: Error Hunt用。誤りを1つ含む文(s)、下線を引く誤り語句(wrong)、修正4択(c、正解はa番目)、
  正しい理由の英語1行(why)、カテゴリ(cat)、レベル(lv 1-5)。catは "Adjective vs Adverb" "Collocation"
  "Word Upgrade" "Articles" "Subject-Verb" "Verb Form" "Linking" 等

## AIモデルへの依頼プロンプト(コピペ用)

どのAIモデル(Claude/ChatGPT/Gemini等)でも、以下を貼れば正しい形式で生成されます:

---

あなたはPTE Academicの教材作成者です。スコア79+(IELTS 8相当)を目指す受験者向けの練習問題を作成してください。

以下のJSON形式**のみ**で出力してください(説明文・Markdownコードフェンス不要):

{"wfd": [], "rs": [], "swt": [], "essay": [], "ra": []}

作成数と基準:
- wfd: 20文。Write from Dictation用。学術的場面、10〜16語、自然な話し言葉。複数形・冠詞・数字・学術語彙の聞き取りポイントを含める
- rs: 10文。Repeat Sentence用。大学のアナウンス調、8〜13語
- swt: 2本。Summarize Written Text用パッセージ。アカデミックな評論、100〜150語、主張+根拠+対立意見を含む1段落
- essay: 3題。PTE頻出形式(Discuss both views / To what extent do you agree / Do advantages outweigh disadvantages)
- ra: 5本。Read Aloud用。50〜65語の1段落、アカデミックな説明文

以下の既存問題とは重複しないこと:
【ここに現在のcontent.jsonの中身を貼る】

---

## 生成後の反映手順

1. AIの出力(JSON)を受け取る
2. GitHubの content.json を開いて編集(Edit)
3. 各配列(wfd / rs / swt / essay)に新しい要素を追記
   ※ファイルごと差し替える場合は、既存の問題も残すようAIに「既存JSONに統合して」と頼むのが楽
4. Commit → アプリをリロードすると「未出題」数が増えていることを確認

## 補足

- アプリ内の「✨ AIで新問題を10問生成」(WFD)は今後も動作します(自分のAPIキーでSonnetを呼ぶ仕組みのため、Fable 5とは無関係)
- ただしアプリ内生成の問題は**端末のブラウザ内にのみ**保存されます。全端末で共有したい問題は content.json に入れてください


---

# Show Don't Tell — Owl Studio (`show/content.json`)

## 仕組み

PTE SUMMIT と同じです。アプリは起動時に `show/content.json` を読み込み、内蔵の問題バンクと
マージします(`id` が重複するものは無視)。ファイルが無い・壊れていても内蔵問題だけで起動します。

更新手順: GitHubで `show/content.json` を編集 → Commit → アプリをリロード。

## 形式

```json
{
  "prompts": [
    {
      "id": "x-b2-03",
      "band": 2,
      "theme": "school",
      "tell": "She was anxious about the exam.",
      "tellWord": "anxious",
      "context": "Ten minutes before the paper is handed out. The hall is very quiet.",
      "hint": {
        "physical": "What small, repeated movement gives her away?",
        "internal": "What changes in her breathing or stomach?",
        "mental": "How does time or memory behave?"
      },
      "show": {
        "physical": ["She lined her three pens up, then lined them up again."],
        "internal": ["Her stomach kept folding over on itself."],
        "mental": ["The clock hand seemed to be moving through syrup."]
      }
    }
  ]
}
```

| キー | 必須 | 内容 |
|---|---|---|
| `id` | ✅ | 一意の文字列。内蔵問題は `b1-01` 形式なので、追加分は `x-` 始まりを推奨 |
| `band` | ✅ | `1`=Explorer(9歳) / `2`=Storyteller(12歳) / `3`=Novelist(大人) |
| `tell` | ✅ | 書き換え対象の抽象的な文 |
| `show` | ✅ | レイヤー別のお手本。`physical` `internal` `mental` のうち**最低1つ** |
| `tellWord` | | 名指しされている感情(小文字) |
| `theme` | | `school` `work` `family` など自由なラベル |
| `context` | | 場面設定1〜2文。これが無いと書きようがないので実質必須 |
| `hint` | | レイヤーごとの誘導質問。Guided難易度では最初から表示される |

### 3レイヤーの定義

- **physical** — 外から見える体の動き・行動(手、肩、膝、顔、声、物の扱い)
- **internal** — 体の内側の感覚(胃、胸、喉、心拍、呼吸、皮膚、体温)
- **mental** — 思考・注意・記憶・時間感覚(数える、繰り返す、忘れる、時計が遅い)

同じ `tell` に対して3レイヤー分書いておくと、アプリが「他のレイヤーではこう書く」を
見せられるので学習効果が高いです。

### 採点語彙の追加(任意)

採点は語彙リストとの照合で行われます。取りこぼしがあれば `lexicon` で足せます。

```json
{
  "lexicon": {
    "tell":     ["furious", "elated"],
    "physical": ["eyelash", "cuff"],
    "internal": ["diaphragm"],
    "mental":   ["calendar"],
    "verbs":    ["fidgeted", "recoiled"]
  }
}
```

活用形は自動で吸収されます(`tremble` を入れれば `trembled` / `trembling` も一致)。

## 注意

- JSONの文字列内で二重引用符 `"` は使わない(使う場合は `\"` にエスケープ)
- 最後の要素の後ろにカンマを付けない
- お手本は**必ず自然な英語**で。ここが教材の品質そのものになります

## AIモデルへの依頼プロンプト(コピペ用)

---

You are writing material for a "Show, Don't Tell" trainer used by advanced
non-native English writers (a 9-year-old and a 12-year-old at a British
international school, and an adult). Output **JSON only** — no prose, no markdown fence.

Produce 12 prompts in this exact shape:

{"prompts":[{"id":"","band":1,"theme":"","tell":"","tellWord":"","context":"",
"hint":{"physical":"","internal":"","mental":""},
"show":{"physical":["",""],"internal":[""],"mental":[""]}}]}

Rules:
- 4 prompts per band. band 1 = age 9, band 2 = age 12, band 3 = adult.
- `id` must start with "x-" and be unique.
- `tell` is a flat sentence that NAMES an emotion or state ("He was nervous.").
- `context` is one or two sentences of concrete scene.
- `hint` is one guiding QUESTION per layer, never an answer.
- `show` lines must be sentences a good novelist would write:
  - physical = visible body/action, internal = sensation inside the body,
    mental = thought, attention, memory, or distorted time.
  - Never reuse the emotion word from `tell`, and never use "felt", "seemed",
    "very" or "really".
  - Concrete and specific. No cliché ("heart pounded like a drum").
- Band 1: everyday scenes (school, friends, family, pets, weather), short sentences,
  but real English — the reader is fluent, just young. Band 2: friendship, exams,
  sport, moving, social media, with some subtext. Band 3: work, relationships,
  memory, ageing, loss — restraint and implication.
- British spelling.
- Do not duplicate any of these existing ids or `tell` sentences:
【ここに現在の show/content.json と、必要なら内蔵問題の tell 一覧を貼る】

---

## 反映手順

1. AIの出力(JSON)を受け取る
2. GitHubで `show/content.json` を開いて編集
3. `prompts` 配列に新しい要素を追記(既存は残す)
4. Commit → アプリをリロード。問題数が増えていることを確認
