import { useRouter } from "next/router";
import { ComponentProps, useEffect, useState } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeHeaderPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "gameStatus" | "diff" | "onChangeDiff" | "scoreAll"
>;

export default function PokeHeader({
  gameStatus,
  diff,
  scoreAll,
  onChangeDiff,
}: Props) {
  const router = useRouter();
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      /* 初期値 */
      setInnerWidth(window.innerWidth);

      /* リサイズ処理追加 */
      window.addEventListener("resize", () => {
        setInnerWidth(window.innerWidth);
      });
    }
  }, []);

  const handleReload = () => {
    router.reload();
  };
  const handleClickPokeImg = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 700);
  };
  return (
    <PokeHeaderPresenter
      gameStatus={gameStatus}
      diff={diff}
      innerWidth={innerWidth}
      clicked={clicked}
      scoreAll={scoreAll}
      onReload={handleReload}
      onChangeDiff={onChangeDiff}
      onClickPokeImg={handleClickPokeImg}
    />
  );
}
