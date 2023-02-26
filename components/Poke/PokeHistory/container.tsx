import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeHistoryPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "myPokeList"> &
  Partial<Pick<ComponentProps<typeof TopPresenter>, "toolTarget">> & {
    isTarget: boolean;
  };

export default function PokeHistory({
  myPokeList,
  isTarget,
  toolTarget,
}: Props) {
  return (
    <PokeHistoryPresenter
      myPokeList={myPokeList}
      isTarget={isTarget}
      toolTarget={toolTarget}
    />
  );
}
