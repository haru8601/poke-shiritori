import { ComponentProps, useState } from "react";
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
>;

export default function PokeHeader({
  gameStatus,
  diff,
  scoreAll,
  innerWidth,
  onChangeDiff,
  onClickStart,
}: Props) {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleReload = () => {
    location.reload();
  };
  const handleClickPokeImg = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 700);
  };
  return (
    <PokeHeaderPresenter
      gameStatus={gameStatus}
      diff={diff}
      innerWidth={innerWidth}
      clicked={clicked}
      scoreAll={scoreAll}
      onReload={handleReload}
      onChangeDiff={onChangeDiff}
      onClickPokeImg={handleClickPokeImg}
      onClickStart={onClickStart}
    />
  );
}
