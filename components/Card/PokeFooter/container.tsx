import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeFooterPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "innerWidth">;

export default function PokeFooter({ innerWidth }: Props) {
  return <PokeFooterPresenter innerWidth={innerWidth} />;
}
