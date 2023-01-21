import TopPresenter from "@/components/Top/presenter";
import { useRouter } from "next/router";
import { ComponentProps } from "react";
import PokeHeaderPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "finishType" | "spaceBasis"
>;

export default function PokeHeader({ spaceBasis, finishType }: Props) {
  const router = useRouter();

  const handleReload = () => {
    router.reload();
  };
  return (
    <PokeHeaderPresenter
      finishType={finishType}
      spaceBasis={spaceBasis}
      onReload={handleReload}
    />
  );
}
