import TopPresenter from "@/components/Top/presenter";
import { ComponentProps } from "react";
import LoadingPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "finishType"> & {
  isMyTurn: boolean;
  spaceBasis: number;
};

export default function Loading({ isMyTurn, finishType, spaceBasis }: Props) {
  return (
    <LoadingPresenter
      isMyTurn={isMyTurn}
      finishType={finishType}
      spaceBasis={spaceBasis}
    />
  );
}
