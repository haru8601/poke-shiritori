import { ComponentProps, useEffect, useState } from "react";
import TopPresenter from "@/components/Top/presenter";
import ThinkingPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "gameStatus" | "toolTarget"
>;

export default function Thinking({ gameStatus, toolTarget }: Props) {
  const [count, setCount] = useState<number>(1);
  useEffect(() => {
    if (gameStatus != "playing_enermy") return;
    let timeoutId = setTimeout(() => {
      setCount((count) => (count % 3) + 1);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [count, gameStatus]);
  return (
    <ThinkingPresenter
      gameStatus={gameStatus}
      toolTarget={toolTarget}
      count={count}
    />
  );
}
