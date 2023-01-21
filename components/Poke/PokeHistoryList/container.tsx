import TopPresenter from "@/components/Top/presenter";
import { ComponentProps } from "react";
import PokeHistoryListPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "myPokeList" | "enermyPokeList" | "isMyTurn"
>;

export default function PokeHistoryList({
  myPokeList,
  enermyPokeList,
  isMyTurn,
}: Props) {
  return (
    <PokeHistoryListPresenter
      myPokeList={myPokeList}
      enermyPokeList={enermyPokeList}
      isMyTurn={isMyTurn}
    />
  );
}
