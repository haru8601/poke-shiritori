import { Button } from "react-bootstrap";
import { OS_KEY } from "./os";

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
    title: "ショートカット一覧",
    body: (
      <div>
        <code>
          {OS_KEY.mac}/{OS_KEY.windows}+Enter
        </code>
        <p>ゲームスタート/回答送信/ランキング保存</p>
        <code>/</code>
        <p>入力ボックスへカーソルを合わせる</p>
        <code>
          {OS_KEY.mac}/{OS_KEY.windows}+I
        </code>
        <p>回答スキップ</p>
      </div>
    ),
  },
  {
    title: "Macだから自動変換されて打ちづらい",
    body: (
      <p>
        入力中(<code>Enter</code>押す前)に、
        <br />
        <code>control+J</code>でひらがな
        <br />
        <code>control+K</code>でカタカナ
        <br />
        に変換できます
      </p>
    ),
  },
  {
    title: "PC版でポケモンの上にカーソルを置くと...?",
    body: <p>試してみてね</p>,
  },
  {
    title: "公式しりとり動画",
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
