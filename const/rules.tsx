import { CONFIG } from "./config";

type Rule = { title: string; body?: JSX.Element };

export const RULES: readonly Rule[] = [
  {
    title: "伸ばし棒は無視します",
    body: <p>{"ex)「キャタピー」->o「ピッピ」"}</p>,
  },
  {
    title: "濁点、半濁点は無視しません",
    body: (
      <>
        <p>{"ex1)「ボーマンダ」->x「タツベイ」"}</p>
        <p>{"ex2)「ボーマンダ」->o「ダーテング」"}</p>
      </>
    ),
  },
  {
    title: "小文字は大文字に変換されます",
    body: <p>{"ex)「ゴローニャ」->o「ヤミラミ」"}</p>,
  },
  {
    title: "特殊な文字は一般的な読み方に変換されます",
    body: (
      <>
        <p>{"ex1)「ニドラン♀(めす)」->o「スターミー」"}</p>
        <p>{"ex2)「ポリゴンＺ(ぜっと)」->o「トランセル」"}</p>
      </>
    ),
  },
  {
    title: "タイプ相性",
    body: (
      <>
        <p>
          直前の相手ポケモンに有利なタイプが有るか無いかで、制限時間とスコアが増え方が変わります
        </p>
        <p>
          {"ex1)「ヒトカゲ」に対して「ゲッコウガ」を出すと、"}
          <span className="text-primary">
            制限時間が2秒増え、スコアは+2000されます
          </span>
        </p>
        <p>
          {"ex2)「ワニノコ」に対して「コダック」を出しても、"}
          <span className="text-danger">0.5秒しか増えず、スコアも+500です</span>
        </p>
      </>
    ),
  },
  {
    title: "ペナルティ",
    body: (
      <p>
        ブラウザのタブを移動した場合
        <span className="text-danger">ペナルティとして制限時間が5秒</span>
        減ります
      </p>
    ),
  },
  {
    title: "ボーナス",
    body: (
      <p>
        CPUが出せるポケモン無くなった場合、
        <span className="text-primary">ボーナスとして10000点</span>加算されます
      </p>
    ),
  },
  {
    title: "ふきとばし",
    body: (
      <p>
        <span className="text-primary">{`${CONFIG.skipMax}回まで`}</span>
        スキップして相手のポケモンをランダムに変更することができます
      </p>
    ),
  },
] as const;
