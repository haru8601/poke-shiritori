import TopPresenter from "@/components/Top/presenter";
import { useRouter } from "next/router";
import { ComponentProps, useState } from "react";
import PokeHeaderPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "finishType" | "diff" | "onChangeDiff"
>;

export default function PokeHeader({ finishType, diff, onChangeDiff }: Props) {
  const router = useRouter();
  const [showSide, setShowSide] = useState<boolean>(false);

  const handleReload = () => {
    router.reload();
  };
  const handleOpenSide = () => {
    setShowSide(true);
  };
  const handleCloseSide = () => {
    setShowSide(false);
  };
  return (
    <PokeHeaderPresenter
      finishType={finishType}
      showSide={showSide}
      diff={diff}
      onReload={handleReload}
      onOpenSide={handleOpenSide}
      onCloseSide={handleCloseSide}
      onChangeDiff={onChangeDiff}
    />
  );
}
