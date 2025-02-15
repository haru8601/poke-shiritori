import { ComponentProps, KeyboardEvent } from "react";
import TopPresenter from "@/components/Top/presenter";
import { GAME_STATUS } from "@/const/gameStatus";
import { Poke } from "@/types/Poke";
import PokeInputPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  | "sentPokeName"
  | "pokeErr"
  | "gameStatus"
  | "inputRef"
  | "os"
  | "skipLeft"
  | "innerWidth"
  | "onClickStart"
  | "onChangePoke"
  | "onSubmitPoke"
  | "onSkip"
> & {
  skipPoke: Poke;
};

export default function PokeInput({
  sentPokeName,
  pokeErr,
  gameStatus,
  inputRef,
  os,
  skipPoke,
  skipLeft,
  innerWidth,
  onClickStart,
  onChangePoke,
  onSubmitPoke,
  onSkip,
}: Props) {
  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key != "Enter") {
      return;
    }
    // IMEの入力中のEnterは弾きたい
    /* keyCodeは非推奨だが代替案があまりない(isComposing等は挙動が微妙)のでこのまま使用 */
    if (e.keyCode == 13 && gameStatus == GAME_STATUS.playingMyturn) {
      onSubmitPoke();
    }
  };

  return (
    <PokeInputPresenter
      sentPokeName={sentPokeName}
      pokeErr={pokeErr}
      gameStatus={gameStatus}
      inputRef={inputRef}
      os={os}
      skipPoke={skipPoke}
      skipLeft={skipLeft}
      innerWidth={innerWidth}
      onKeydown={handleKeydown}
      onClickStart={onClickStart}
      onChangePoke={onChangePoke}
      onSubmitPoke={onSubmitPoke}
      onSkip={onSkip}
    />
  );
}
