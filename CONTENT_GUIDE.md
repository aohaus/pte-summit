# PTE SUMMIT コンテンツ拡充ガイド

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
