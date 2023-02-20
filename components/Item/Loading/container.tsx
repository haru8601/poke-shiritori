import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import LoadingPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "gameStatus"> & {
  isMyTurn: boolean;
};

export default function Loading({ isMyTurn, gameStatus: gameStatus }: Props) {
  return <LoadingPresenter isMyTurn={isMyTurn} gameStatus={gameStatus} />;
}
