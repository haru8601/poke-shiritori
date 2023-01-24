import TopPresenter from "@/components/Top/presenter";
import { CONFIG } from "@/const/config";
import { ComponentProps, useState } from "react";
import PokeCardPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "targetPoke"> & {
  small?: boolean;
  zIndex?: number;
  imgBase?: number;
};

export default function PokeCard({
  targetPoke,
  small = false,
  zIndex = 0,
  imgBase = CONFIG.spaceBasis,
}: Props) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const handleClickPokeImg = () => {
    setIsHover(true);
    /* 0.7s後にクラス解除 */
    setTimeout(() => {
      setIsHover(false);
    }, 700);
  };
  return (
    <PokeCardPresenter
      targetPoke={targetPoke}
      small={small}
      zIndex={zIndex}
      imgBase={imgBase}
      isHover={isHover}
      onClickPokeImg={handleClickPokeImg}
    />
  );
}
