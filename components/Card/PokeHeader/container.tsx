import { ComponentProps, useRef, useState } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeHeaderPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  | "gameStatus"
  | "monthScoreAll"
  | "totalScoreAll"
  | "innerWidth"
  | "onPlayAudio"
  | "onReloadRanking"
>;

export default function PokeHeader({
  gameStatus,
  monthScoreAll,
  totalScoreAll,
  innerWidth,
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
      monthScoreAll={monthScoreAll}
      totalScoreAll={totalScoreAll}
      toolTarget={toolTarget}
      onReload={handleReload}
      onEnterPokeImg={handlEnterPokeImg}
      onPlayAudio={onPlayAudio}
      onReloadRanking={onReloadRanking}
    />
  );
}
