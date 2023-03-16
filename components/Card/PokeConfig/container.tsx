import { ComponentProps, ReactNode, useEffect, useState } from "react";
import { Score } from "@/types/Score";
import PokeConfigPresenter from "./presenter";
import PokeHeaderPresenter from "../PokeHeader/presenter";

type Props = Pick<
  ComponentProps<typeof PokeHeaderPresenter>,
  "scoreAllPromise" | "innerWidth" | "onPlayAudio"
>;

export default function PokeConfig({
  scoreAllPromise,
  innerWidth,
  onPlayAudio,
}: Props) {
  const [showSide, setShowSide] = useState<boolean>(false);
  const [rankRowAll, setRankRowAll] = useState<ReactNode>("Loading...");

  /* スコアのpromiseがfulfilledならセット */
  useEffect(() => {
    (async () => {
      /* 配列内の要素を先頭から見てfulfilledならその値を取得 */
      Promise.race([scoreAllPromise, undefined]) != undefined &&
        setRankRowAll(
          (await scoreAllPromise).map((score: Score, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{score.user}</td>
                <td>{score.score}</td>
              </tr>
            );
          })
        );
    })();
  }, [scoreAllPromise]);

  const handleOpenSide = () => {
    setShowSide(true);
  };
  const handleCloseSide = () => {
    setShowSide(false);
  };

  return (
    <PokeConfigPresenter
      showSide={showSide}
      rankRowAll={rankRowAll}
      innerWidth={innerWidth}
      onOpenSide={handleOpenSide}
      onCloseSide={handleCloseSide}
      onPlayAudio={onPlayAudio}
    />
  );
}
