import { ComponentProps, useEffect, useState } from "react";
import TopPresenter from "@/components/Top/presenter";
import { GAME_STATUS } from "@/const/gameStatus";
import { Poke } from "@/types/Poke";
import getPokeHistory from "@/utils/poke/getPokeHistory";
import PokeHistoryListPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "pokeMap" | "gameStatus" | "toolTarget"
>;

export default function PokeHistoryList({
  pokeMap,
  gameStatus,
  toolTarget,
}: Props) {
  const [myPokeList, setMyPokeList] = useState<Poke[]>([]);
  const [enermyPokeList, setEnermyPokeList] = useState<Poke[]>([]);
  useEffect(() => {
    if (gameStatus == GAME_STATUS.skip) {
      return;
    }
    setMyPokeList(getPokeHistory(pokeMap, true));
    setEnermyPokeList(getPokeHistory(pokeMap, false));
  }, [gameStatus, pokeMap]);
  return (
    <PokeHistoryListPresenter
      myPokeList={myPokeList}
      enermyPokeList={enermyPokeList}
      gameStatus={gameStatus}
      toolTarget={toolTarget}
    />
  );
}
