import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
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
  | "onKeydown"
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
  onKeydown,
  onClickStart,
  onChangePoke,
  onSubmitPoke,
  onSkip,
}: Props) {
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
      onKeydown={onKeydown}
      onClickStart={onClickStart}
      onChangePoke={onChangePoke}
      onSubmitPoke={onSubmitPoke}
      onSkip={onSkip}
    />
  );
}
