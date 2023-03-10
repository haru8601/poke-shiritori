import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeHistoryListPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "myPokeList" | "enermyPokeList" | "gameStatus" | "toolTarget"
>;

export default function PokeHistoryList({
  myPokeList,
  enermyPokeList,
  gameStatus,
  toolTarget,
}: Props) {
  return (
    <PokeHistoryListPresenter
      myPokeList={myPokeList}
      enermyPokeList={enermyPokeList}
      gameStatus={gameStatus}
      toolTarget={toolTarget}
    />
  );
}
