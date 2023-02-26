import { ComponentProps, useRef, useState } from "react";
import PokeConfigPresenter from "./presenter";
import PokeHeaderPresenter from "../PokeHeader/presenter";

type Props = Pick<
  ComponentProps<typeof PokeHeaderPresenter>,
  "diff" | "onChangeDiff" | "scoreAll" | "innerWidth"
>;

export default function PokeConfig({
  diff,
  scoreAll,
  innerWidth,
  onChangeDiff,
}: Props) {
  const [showSide, setShowSide] = useState<boolean>(false);
  const toolTarget = useRef(null);

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
      innerWidth={innerWidth}
      toolTarget={toolTarget}
      onChangeDiff={onChangeDiff}
      onOpenSide={handleOpenSide}
      onCloseSide={handleCloseSide}
    />
  );
}
