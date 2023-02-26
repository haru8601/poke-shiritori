import { ComponentProps, useState } from "react";
import TopPresenter from "@/components/Top/presenter";
import { CONFIG } from "@/const/config";
import { PATH } from "@/const/path";
import PokeCardPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "targetPoke"> &
  Partial<Pick<ComponentProps<typeof TopPresenter>, "gameStatus">> & {
    small?: boolean;
    zIndex?: number;
    imgBase?: number;
  };

export default function PokeCard({
  targetPoke,
  gameStatus = "playing_myturn",
  small = false,
  zIndex = 0,
  imgBase = CONFIG.spaceBasis,
}: Props) {
  const [entered, setEntered] = useState<boolean>(false);

  const pokeName =
    gameStatus != "before_start" && gameStatus != "will_start"
      ? targetPoke.name.japanese
      : "？？？";

  const pokeImg =
    gameStatus != "before_start" && gameStatus != "will_start"
      ? targetPoke.imgPath ?? PATH.defaultImg
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
