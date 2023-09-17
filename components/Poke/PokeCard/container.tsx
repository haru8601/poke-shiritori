import { ComponentProps, useState } from "react";
import { CONFIG } from "@/const/config";
import { GAME_STATUS } from "@/const/gameStatus";
import { PATH } from "@/const/path";
import { Poke } from "@/types/Poke";
import PokeCardPresenter from "./presenter";
import PokeFirstPresenter from "../PokeFirst/presenter";

type Props = Partial<
  Pick<ComponentProps<typeof PokeFirstPresenter>, "gameStatus">
> & {
  targetPoke: Poke;
  small?: boolean;
  zIndex?: number;
  imgBase?: number;
};

export default function PokeCard({
  targetPoke,
  gameStatus = GAME_STATUS.playingMyturn,
  small = false,
  zIndex = 0,
  imgBase = CONFIG.spaceBasis,
}: Props) {
  const [entered, setEntered] = useState<boolean>(false);

  const pokeName =
    gameStatus != GAME_STATUS.beforeStart && gameStatus != GAME_STATUS.willStart
      ? targetPoke.name.japanese
      : "？？？";

  const pokeImg =
    gameStatus != GAME_STATUS.beforeStart &&
    gameStatus != GAME_STATUS.willStart &&
    targetPoke.imgPath
      ? targetPoke.imgPath
      : PATH.defaultImg;

  const handleEnterPokeImg = () => {
    setEntered(true);
    /* 0.7s後にクラス解除 */
    setTimeout(() => {
      setEntered(false);
    }, 700);
  };
  return (
    <PokeCardPresenter
      pokeName={pokeName}
      pokeImg={pokeImg}
      small={small}
      zIndex={zIndex}
      imgBase={imgBase}
      entered={entered}
      onEnterPokeImg={handleEnterPokeImg}
    />
  );
}
