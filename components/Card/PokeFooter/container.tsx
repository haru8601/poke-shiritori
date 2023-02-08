import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeFooterPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "usedPokeCount" | "myIndex"
>;

export default function PokeFooter({ usedPokeCount, myIndex }: Props) {
  return (
    <PokeFooterPresenter usedPokeCount={usedPokeCount} myIndex={myIndex} />
  );
}
