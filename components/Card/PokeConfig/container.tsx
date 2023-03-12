import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";
import { Score } from "@/types/Score";
import PokeConfigPresenter from "./presenter";
import PokeHeaderPresenter from "../PokeHeader/presenter";

type Props = Pick<
  ComponentProps<typeof PokeHeaderPresenter>,
  "diff" | "onChangeDiff" | "scoreAllPromise" | "innerWidth"
>;

export default function PokeConfig({
  diff,
  scoreAllPromise,
  innerWidth,
  onChangeDiff,
}: Props) {
  const [showSide, setShowSide] = useState<boolean>(false);
  const toolTarget = useRef(null);
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
      diff={diff}
      showSide={showSide}
      rankRowAll={rankRowAll}
      innerWidth={innerWidth}
      toolTarget={toolTarget}
      onChangeDiff={onChangeDiff}
      onOpenSide={handleOpenSide}
      onCloseSide={handleCloseSide}
    />
  );
}
