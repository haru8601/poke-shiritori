import TopPresenter from "@/components/Top/presenter";
import { ComponentProps } from "react";
import PokeInputPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  | "pokeList"
  | "sentPokeName"
  | "pokeErr"
  | "isMyTurn"
  | "finishType"
  | "onKeydown"
  | "onChangePoke"
  | "onSubmitPoke"
  | "diff"
>;

export default function PokeInput({
  pokeList,
  sentPokeName,
  pokeErr,
  isMyTurn,
  finishType,
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
      isMyTurn={isMyTurn}
      finishType={finishType}
      diff={diff}
      onKeydown={onKeydown}
      onChangePoke={onChangePoke}
      onSubmitPoke={onSubmitPoke}
    />
  );
}
