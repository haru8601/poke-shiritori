import TopPresenter from "@/components/Top/presenter";
import { ComponentProps } from "react";
import PokeHistoryListPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "myPokeList" | "enermyPokeList" | "isMyTurn" | "spaceBasis"
>;

export default function PokeHistoryList({
  myPokeList,
  enermyPokeList,
  isMyTurn,
  spaceBasis,
}: Props) {
  return (
    <PokeHistoryListPresenter
      myPokeList={myPokeList}
      enermyPokeList={enermyPokeList}
      isMyTurn={isMyTurn}
      spaceBasis={spaceBasis}
    />
  );
}
