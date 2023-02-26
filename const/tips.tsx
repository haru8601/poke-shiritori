import { Button } from "react-bootstrap";

type Tip = {
  title: string;
  body: JSX.Element;
};

export const TIPS: readonly Tip[] = [
  {
    title: "カタカナ打つのめんどくさい",
    body: (
      <div>
        <p>ひらがなでも通ります。</p>
        <p>
          ちなみに、例えば「ニドラン♂」を入力したければ「にどらんおす」でも通ります。
        </p>
      </div>
    ),
  },
  {
    title: "Macだから自動変換されて打ちづらい",
    body: (
      <div>
        <p>
          入力中(<code>Enter</code>押す前)に、
          <br />
          <code>control+J</code>でひらがな
          <br />
          <code>control+K</code>でカタカナ
          <br />
          に変換できます
        </p>
      </div>
    ),
  },
  {
    title: "β版？？",
    body: (
      <div>
        <p>
          友達同士で勝負(フレ戦)とか出来たら正式リリースって事にしようかなぁとか思ってます。
        </p>
      </div>
    ),
  },
  {
    title: "PC版でポケモンの上にカーソルを置くと...?",
    body: <p>試してみてね</p>,
  },
  {
    title: "最大何匹まで繋げられる？",
    body: <p>ホーホー始まりルナトーン終わりの446匹が最長らしいです。</p>,
  },
  {
    title: "どの単語で終わるのが強い？",
    body: (
      <div>
        <p>
          {
            "「ス」はポケモンの名前の先頭に付くことが少なく、終わりに付くことが非常に多い単語なので割と使いやすいです"
          }
        </p>
        <p>
          {
            "「ザ」,「ゾ」,「ロ」から始まるポケモンもほとんどいないので一見使いやすそうですが、それらの単語で終わるポケモンもほとんどいないのでしりとりで使うには難しいかもしれません。"
          }
        </p>
      </div>
    ),
  },
  {
    title: "公式しりとり動画(short Ver.)",
    body: (
      <Button
        variant="link"
        href="https://www.youtube.com/watch?v=uvOfXoQxT2o"
        target="_blank"
      >
        <i style={{ color: "red" }} className="bi bi-youtube"></i>
        【公式】「ポケモンしりとり（ピカチュウ→ミュウVer.）」
        アニメ「ポケットモンスター」エンディングテーマ
      </Button>
    ),
  },
] as const;
