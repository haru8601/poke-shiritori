import { ComponentProps } from "react";
import { Stack } from "react-bootstrap";
import PokeHistory from "../PokeHistory/container";
import PokeHistoryList from "./container";

type Props = ComponentProps<typeof PokeHistoryList>;

export default function PokeHistoryListPresenter({
  myPokeList,
  enermyPokeList,
  isMyTurn,
}: Props) {
  return (
    <Stack
      style={{ height: "40vh", overflow: "scroll" }}
      className="justify-content-around"
      direction="horizontal"
    >
      <PokeHistory myPokeList={myPokeList} isMyTurn={isMyTurn} />
      <PokeHistory myPokeList={enermyPokeList} isMyTurn={!isMyTurn} />
    </Stack>
  );
}
