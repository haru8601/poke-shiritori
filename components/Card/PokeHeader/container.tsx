import { ComponentProps, useRef, useState } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeHeaderPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  | "gameStatus"
  | "diff"
  | "scoreAll"
  | "innerWidth"
  | "onChangeDiff"
  | "onClickStart"
  | "onPlayAudio"
  | "onReloadRanking"
>;

export default function PokeHeader({
  gameStatus,
  diff,
  scoreAll,
  innerWidth,
  onChangeDiff,
  onClickStart,
  onPlayAudio,
  onReloadRanking,
}: Props) {
  const [entered, setEntered] = useState<boolean>(false);
  const toolTarget = useRef(null);

  const handleReload = () => {
    location.reload();
  };
  const handlEnterPokeImg = () => {
    setEntered(true);
    setTimeout(() => {
      setEntered(false);
    }, 700);
  };
  return (
    <PokeHeaderPresenter
      gameStatus={gameStatus}
      diff={diff}
      innerWidth={innerWidth}
      entered={entered}
      scoreAll={scoreAll}
      toolTarget={toolTarget}
      onReload={handleReload}
      onChangeDiff={onChangeDiff}
      onEnterPokeImg={handlEnterPokeImg}
      onClickStart={onClickStart}
      onPlayAudio={onPlayAudio}
      onReloadRanking={onReloadRanking}
    />
  );
}
