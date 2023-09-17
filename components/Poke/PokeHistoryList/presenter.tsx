import { ComponentProps } from "react";
import { Stack } from "react-bootstrap";
import { GAME_STATUS } from "@/const/gameStatus";
import { Poke } from "@/types/Poke";
import PokeHistoryList from "./container";
import PokeHistory from "../PokeHistory/container";

type Props = Pick<
  ComponentProps<typeof PokeHistoryList>,
  "gameStatus" | "toolTarget"
> & {
  myPokeList: Poke[];
  enermyPokeList: Poke[];
};

export default function PokeHistoryListPresenter({
  myPokeList,
  enermyPokeList,
  gameStatus,
  toolTarget,
}: Props) {
  return (
    <Stack
      style={{ height: "40vh" }}
      className="justify-content-around overflow-scroll"
      direction="horizontal"
    >
      <PokeHistory
        myPokeList={myPokeList}
        isTarget={gameStatus == GAME_STATUS.playingMyturn}
        toolTarget={toolTarget}
      />
      <PokeHistory
        myPokeList={enermyPokeList}
        isTarget={gameStatus == GAME_STATUS.playingEnermy}
        toolTarget={toolTarget}
      />
    </Stack>
  );
}
