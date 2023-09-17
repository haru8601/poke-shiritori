import { ComponentProps, useEffect, useState } from "react";
import TopPresenter from "@/components/Top/presenter";
import { CONFIG } from "@/const/config";
import { Poke } from "@/types/Poke";
import getTargetPoke from "@/utils/poke/getTargetPoke";
import PokeTargetPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "pokeMap" | "firstPoke" | "gameStatus"
>;

export default function PokeTarget({ pokeMap, firstPoke, gameStatus }: Props) {
  const imgBase = CONFIG.spaceBasis;
  const [targetPoke, setTargetPoke] = useState<Poke>(firstPoke);
  useEffect(() => {
    setTargetPoke(getTargetPoke(pokeMap, firstPoke));
  }, [firstPoke, pokeMap]);
  return (
    <PokeTargetPresenter
      targetPoke={targetPoke}
      gameStatus={gameStatus}
      imgBase={imgBase}
    />
  );
}
