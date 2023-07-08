import { ComponentProps } from "react";
import { Stack } from "react-bootstrap";
import { GAME_STATUS } from "@/const/gameStatus";
import PokeHistoryList from "./container";
import PokeHistory from "../PokeHistory/container";

type Props = ComponentProps<typeof PokeHistoryList>;

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
