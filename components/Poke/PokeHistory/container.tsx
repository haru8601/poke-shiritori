import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeHistoryPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "myPokeList" | "isMyTurn"
>;

export default function PokeHistory({ myPokeList, isMyTurn }: Props) {
  return <PokeHistoryPresenter myPokeList={myPokeList} isMyTurn={isMyTurn} />;
}
