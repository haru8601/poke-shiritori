import { ComponentProps, ReactNode, useEffect, useState } from "react";
import { TEXT } from "@/const/text";
import { parseDayjs } from "@/lib/date/dayjs";
import { Score } from "@/types/Score";
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

  /* スコアが変わるたびにランキングを更新 */
  useEffect(() => {
    /* scoreが取得されてなければランキングも表示しない */
    if (scoreAll.length) {
      setRankRowAll(
        scoreAll.map((score: Score, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score.user}</td>
              <td>{score.score}</td>
            </tr>
          );
        })
      );
      setMonthRankRowAll(
        scoreAll
          // 1ヶ月前までのスコアでフィルタリング
          .filter((score) =>
            parseDayjs(score.update_date).isAfter(
              parseDayjs().subtract(1, "month")
            )
          )
          .map((score: Score, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{score.user}</td>
                <td>{score.score}</td>
              </tr>
            );
          })
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
    onReloadRanking();
  };

  return (
    <PokeConfigPresenter
      showSide={showSide}
      rankRowAll={rankRowAll}
      monthRankRowAll={monthRankRowAll}
      innerWidth={innerWidth}
      onOpenSide={handleOpenSide}
      onCloseSide={handleCloseSide}
      onPlayAudio={onPlayAudio}
      onReloadRanking={handleReloadRanking}
    />
  );
}
