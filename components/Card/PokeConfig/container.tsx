import { ComponentProps, ReactNode, useEffect, useState } from "react";
import { getOldRanking } from "@/actions/ranking/getOldRanking";
import { TEXT } from "@/const/text";
import { Score } from "@/types/Score";
import { addDummy } from "@/utils/addDummy";
import { convertToRankNode } from "@/utils/convertToRankNode";
import { getMonthScoreAll } from "@/utils/getMonthScoreAll";
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

  // スコアが変わるたびにランキングを更新
  useEffect(() => {
    // scoreが取得されてなければランキングも表示しない
    if (scoreAll.length) {
      const tmpScoreAll = addDummy(scoreAll);
      // 総合ランキング
      setRankRowAll(convertToRankNode(tmpScoreAll, true));

      const monthScoreAll: Score[] = getMonthScoreAll(scoreAll);

      const tmpMonthScoreAll = addDummy(monthScoreAll);
      // 月間ランキング
      setMonthRankRowAll(convertToRankNode(tmpMonthScoreAll, true));

      (async () => {
        // (キャッシュがなければ)DBから取得
        const oldRanking = await getOldRanking();
        // 旧バージョンランキング
        setOldRankRowAll(convertToRankNode(oldRanking, false));
      })();
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
    setOldRankRowAll(TEXT.reloading);
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
