import { CSSProperties } from "react";
import { CONFIG } from "@/const/config";
import { getRankText } from "@/utils/getMyRank";
import TweetPresenter from "./presenter";

type Props = {
  score: number;
  style?: CSSProperties;
  className?: string;
  myIndex?: number;
  myMonthIndex?: number;
};

export default function Tweet({
  score,
  myIndex = -1,
  myMonthIndex = -1,
  style,
  className,
}: Props) {
  let text: string = "ポケモンしりとりに挑戦中！";
  const rankedInFlg: boolean = myIndex >= 0 && myIndex < CONFIG.topRankLimit;
  const monthRankedInFlg: boolean =
    myMonthIndex >= 0 && myMonthIndex < CONFIG.topRankLimit;
  if (score != 0) {
    text = `ポケモンしりとりで ${score} 点(${getRankText(score)})を出し${
      monthRankedInFlg
        ? `て、月間${myMonthIndex + 1}位${
            rankedInFlg ? `(総合${myIndex + 1}位)` : ""
          }にランクインした！`
        : "た！"
    }`;
  }
  return <TweetPresenter text={text} style={style} className={className} />;
}
