import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeFooterPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "score" | "myIndex">;

export default function PokeFooter({ score, myIndex }: Props) {
  return <PokeFooterPresenter score={score} myIndex={myIndex} />;
}
