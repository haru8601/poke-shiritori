import { ComponentProps, useState } from "react";
import PokeConfigPresenter from "./presenter";
import PokeHeader from "../PokeHeader/container";

type Props = Pick<
  ComponentProps<typeof PokeHeader>,
  "diff" | "onChangeDiff" | "scoreAll"
>;

export default function PokeConfig({ diff, scoreAll, onChangeDiff }: Props) {
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
      scoreAll={scoreAll}
      onChangeDiff={onChangeDiff}
      onOpenSide={handleOpenSide}
      onCloseSide={handleCloseSide}
    />
  );
}
