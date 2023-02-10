import { ComponentProps, useState } from "react";
import PokeConfigPresenter from "./presenter";
import PokeHeader from "../PokeHeader/container";

type Props = Pick<ComponentProps<typeof PokeHeader>, "diff" | "onChangeDiff">;

export default function PokeConfig({ diff, onChangeDiff }: Props) {
  const [showSide, setShowSide] = useState<boolean>(false);
  const handleOpenSide = () => {
    setShowSide(true);
  };
  const handleCloseSide = () => {
    setShowSide(false);
  };

  return (
    <PokeConfigPresenter
      diff={diff}
      showSide={showSide}
      onChangeDiff={onChangeDiff}
      onOpenSide={handleOpenSide}
      onCloseSide={handleCloseSide}
    />
  );
}
