import TopPresenter from "@/components/Top/presenter";
import { ComponentProps } from "react";
import PokeHistoryPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "myPokeList" | "isMyTurn" | "spaceBasis"
>;

export default function PokeHistory({
  myPokeList,
  isMyTurn,
  spaceBasis,
}: Props) {
  return (
    <PokeHistoryPresenter
      myPokeList={myPokeList}
      isMyTurn={isMyTurn}
      spaceBasis={spaceBasis}
    />
  );
}
