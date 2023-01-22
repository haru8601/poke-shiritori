import TopPresenter from "@/components/Top/presenter";
import { CONFIG } from "@/const/config";
import { ComponentProps } from "react";
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
  return (
    <PokeCardPresenter
      targetPoke={targetPoke}
      small={small}
      zIndex={zIndex}
      imgBase={imgBase}
    />
  );
}
