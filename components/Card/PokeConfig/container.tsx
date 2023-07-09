import { ComponentProps, ReactNode, useEffect, useState } from "react";
import { TEXT } from "@/const/text";
import { Score } from "@/types/Score";
import { addDummy } from "@/utils/addDummy";
import { convertToRankNode } from "@/utils/convertToRankNode";
import { findResetDate } from "@/utils/findResetHistory";
import { getLatestScoreAll } from "@/utils/getLatestScoreAll";
import { getMonthScoreAll } from "@/utils/getMonthScoreAll";
import { getOldScoreAll } from "@/utils/getOldScoreAll";
import { getSortedHistories } from "@/utils/getSortedHistories";
import PokeConfigPresenter from "./presenter";
import PokeHeaderPresenter from "../PokeHeader/presenter";

type Props = Pick<
  ComponentProps<typeof PokeHeaderPresenter>,
  "scoreAll" | "innerWidth" | "onPlayAudio" | "onReloadRanking"
>;

export default function PokeConfig({
  scoreAll,
  innerWidth,
  onPlayAudio,
  onReloadRanking,
}: Props) {
  const [showSide, setShowSide] = useState<boolean>(false);
  const [rankRowAll, setRankRowAll] = useState<ReactNode>(TEXT.loading);
  const [monthRankRowAll, setMonthRankRowAll] = useState<ReactNode>(
    TEXT.loading
  );
  const [oldRankRowAll, setOldRankRowAll] = useState<ReactNode>(TEXT.loading);

  /* スコアが変わるたびにランキングを更新 */
  useEffect(() => {
    /* scoreが取得されてなければランキングも表示しない */
    if (scoreAll.length) {
      const resetDate = findResetDate(getSortedHistories());
      // ランキングリセット後のみのスコア
      const latestScoreAll = getLatestScoreAll(scoreAll, resetDate);

      const tmpScoreAll = addDummy(latestScoreAll);
      setRankRowAll(convertToRankNode(tmpScoreAll, true));

      const monthScoreAll: Score[] = getMonthScoreAll(latestScoreAll);

      const tmpMonthScoreAll = addDummy(monthScoreAll);
      setMonthRankRowAll(convertToRankNode(tmpMonthScoreAll, true));

      setOldRankRowAll(
        convertToRankNode(getOldScoreAll(scoreAll, resetDate), false)
      );
    }
  }, [scoreAll]);

  const handleOpenSide = () => {
    setShowSide(true);
  };
  const handleCloseSide = () => {
    setShowSide(false);
  };

  const handleReloadRanking = () => {
    /* 一旦ランキングを初期化(更新がUI上でもわかるように) */
    setRankRowAll(TEXT.reloading);
    setMonthRankRowAll(TEXT.reloading);
    onReloadRanking();
  };

  return (
    <PokeConfigPresenter
      showSide={showSide}
      rankRowAll={rankRowAll}
      monthRankRowAll={monthRankRowAll}
      oldRankRowAll={oldRankRowAll}
      innerWidth={innerWidth}
      onOpenSide={handleOpenSide}
      onCloseSide={handleCloseSide}
      onPlayAudio={onPlayAudio}
      onReloadRanking={handleReloadRanking}
    />
  );
}
