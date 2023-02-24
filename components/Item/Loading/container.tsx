import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import LoadingPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "gameStatus">;

export default function Loading({ gameStatus }: Props) {
  return <LoadingPresenter gameStatus={gameStatus} />;
}
