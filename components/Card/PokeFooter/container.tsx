import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeFooterPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "usedPokeCount">;

export default function PokeFooter({ usedPokeCount }: Props) {
  return <PokeFooterPresenter usedPokeCount={usedPokeCount} />;
}
