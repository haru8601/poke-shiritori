import { ComponentProps } from "react";
import { Stack } from "react-bootstrap";
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
        isTarget={gameStatus == "playing_myturn"}
        toolTarget={toolTarget}
      />
      <PokeHistory
        myPokeList={enermyPokeList}
        isTarget={gameStatus == "playing_enermy"}
        toolTarget={toolTarget}
      />
    </Stack>
  );
}
