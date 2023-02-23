import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import { CONFIG } from "@/const/config";
import PokeTargetPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "targetPoke" | "gameStatus"
>;

export default function PokeTarget({ targetPoke, gameStatus }: Props) {
  const imgBase = CONFIG.spaceBasis;
  return (
    <PokeTargetPresenter
      targetPoke={targetPoke}
      gameStatus={gameStatus}
      imgBase={imgBase}
    />
  );
}
