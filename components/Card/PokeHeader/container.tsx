import { ComponentProps, useRef, useState } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeHeaderPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  | "gameStatus"
  | "scoreAll"
  | "innerWidth"
  | "onClickStart"
  | "onPlayAudio"
  | "onReloadRanking"
>;

export default function PokeHeader({
  gameStatus,
  scoreAll,
  innerWidth,
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
      innerWidth={innerWidth}
      entered={entered}
      scoreAll={scoreAll}
      toolTarget={toolTarget}
      onReload={handleReload}
      onEnterPokeImg={handlEnterPokeImg}
      onClickStart={onClickStart}
      onPlayAudio={onPlayAudio}
      onReloadRanking={onReloadRanking}
    />
  );
}
