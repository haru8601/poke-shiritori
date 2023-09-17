import { ComponentProps } from "react";
import PokeHistoryPresenter from "./presenter";
import PokeHistoryListPresenter from "../PokeHistoryList/presenter";

type Props = Pick<
  ComponentProps<typeof PokeHistoryListPresenter>,
  "myPokeList" | "toolTarget"
> & {
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
