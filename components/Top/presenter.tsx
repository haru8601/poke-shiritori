import { Poke } from "@/types/Poke";
import { ChangeEvent, KeyboardEvent } from "react";

type Props = {
  pokeList: Poke[];
  isMyTurn: boolean;
  sentPoke: string;
  targetPoke: string;
  pokeErr: string;
  myPokeList: string[];
  enermyPokeList: string[];
  onChangePoke: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeydown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSubmitPoke: () => void;
};

export default function TopPresenter({
  pokeList,
  isMyTurn,
  sentPoke,
  targetPoke,
  pokeErr,
  myPokeList,
  enermyPokeList,
  onChangePoke,
  onKeydown,
  onSubmitPoke,
}: Props) {
  return (
    <>
      <h1 className="m-3 font-bold text-center">ポケモンしりとり</h1>
      <div className="text-center">{targetPoke}</div>
      <div className="text-center m-3">
        <p className="text-rose-500 h-10">{pokeErr}</p>
        <input
          id="poke-input"
          list="poke-list"
          className="m-3 h-10"
          value={sentPoke}
          onChange={onChangePoke}
          onKeyDown={onKeydown}
          placeholder="ポケモンを入力してください"
          disabled={!isMyTurn}
        />
        <datalist id="poke-list">
          {pokeList.map((poke) => {
            return <option key={poke.id}>{poke.name.japanese}</option>;
          })}
        </datalist>
        <input type="submit" onClick={onSubmitPoke} disabled={!isMyTurn} />
      </div>
      <div className="grow flex">
        <div
          className={`p-3 text-center basis-1/2 ${
            isMyTurn ? "border-2 border-rose-500" : ""
          }`}
        >
          {myPokeList
            .map((myPoke, index) => {
              return <p key={index}>{myPoke}</p>;
            })
            .reverse()}
        </div>
        <div
          className={`p-3 text-center basis-1/2 ${
            isMyTurn ? "" : "border-2 border-rose-500"
          }`}
        >
          {enermyPokeList
            .map((enermyPoke, index) => {
              return <p key={index}>{enermyPoke}</p>;
            })
            .reverse()}
        </div>
      </div>
    </>
  );
}
