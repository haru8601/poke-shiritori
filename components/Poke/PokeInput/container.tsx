import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeInputPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  | "pokeList"
  | "sentPokeName"
  | "pokeErr"
  | "gameStatus"
  | "onKeydown"
  | "onChangePoke"
  | "onSubmitPoke"
  | "diff"
>;

export default function PokeInput({
  pokeList,
  sentPokeName,
  pokeErr,
  gameStatus,
  diff,
  onKeydown,
  onChangePoke,
  onSubmitPoke,
}: Props) {
  return (
    <PokeInputPresenter
      pokeList={pokeList}
      sentPokeName={sentPokeName}
      pokeErr={pokeErr}
      gameStatus={gameStatus}
      diff={diff}
      onKeydown={onKeydown}
      onChangePoke={onChangePoke}
      onSubmitPoke={onSubmitPoke}
    />
  );
}
