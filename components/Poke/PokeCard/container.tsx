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
  gameStatus = "playing",
  small = false,
  zIndex = 0,
  imgBase = CONFIG.spaceBasis,
}: Props) {
  const [clicked, setClicked] = useState<boolean>(false);

  const pokeName =
    gameStatus != "before_start" && gameStatus != "will_start"
      ? targetPoke.name.japanese
      : "？？？";

  const pokeImg =
    gameStatus != "before_start" && gameStatus != "will_start"
      ? targetPoke.imgPath ?? PATH.defaultImg
      : PATH.defaultImg;

  const handleClickPokeImg = () => {
    setClicked(true);
    /* 0.7s後にクラス解除 */
    setTimeout(() => {
      setClicked(false);
    }, 700);
  };
  return (
    <PokeCardPresenter
      pokeName={pokeName}
      pokeImg={pokeImg}
      small={small}
      zIndex={zIndex}
      imgBase={imgBase}
      clicked={clicked}
      onClickPokeImg={handleClickPokeImg}
    />
  );
}
