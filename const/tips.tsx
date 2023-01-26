import { Button } from "react-bootstrap";

export const TIPS = [
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
    title: "最大何匹まで繋げられる？",
    body: <p>ホーホー始まりルナトーン終わりの446匹が最長らしいです。</p>,
  },
  {
    title: "どの単語で終わるのが強い？",
    body: (
      <div>
        <p>{'※最後が"ン"で終わるポケモンは除いてます'}</p>
        <p>
          {
            "ザ,ゾ,ロあたりは先頭に付くポケモンがほとんどいません(それぞれ3匹)。ただ、それらの単語で終わるポケモンもほとんどいません。"
          }
        </p>
        <p>
          {
            '先頭に付くことが少なく、終わりに付くことが多い単語は、調べるとダントツで"ス"でした(先頭:15匹, 終わり: 91匹)'
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
