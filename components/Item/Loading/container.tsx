import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import LoadingPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "finishType"> & {
  isMyTurn: boolean;
};

export default function Loading({ isMyTurn, finishType }: Props) {
  return <LoadingPresenter isMyTurn={isMyTurn} finishType={finishType} />;
}
