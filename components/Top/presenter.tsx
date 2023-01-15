import { ChangeEvent, KeyboardEvent } from "react";

type Props = {
  targetPoke: string;
  pokeErr: string;
  myPokeList: string[];
  enermyPokeList: string[];
  onChangePoke: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeydown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSubmitPoke: () => void;
};

export default function TopPresenter({
  targetPoke,
  pokeErr,
  myPokeList,
  enermyPokeList,
  onChangePoke,
  onKeydown,
  onSubmitPoke,
}: Props) {
  return (
    <div className="m-3">
      <h1 className="m-3 font-bold text-center">ポケモンしりとり</h1>
      <div className="text-center m-3">
        <p className="text-red-400 h-10">{pokeErr}</p>
        <input
          id="poke-input"
          value={targetPoke}
          onChange={onChangePoke}
          onKeyDown={onKeydown}
          placeholder="ポケモンを入力してください"
        />
        <input type="submit" onClick={onSubmitPoke} />
      </div>
      <div className="flex place-content-around">
        <div className="my">
          {myPokeList
            .map((myPoke, index) => {
              return <p key={index}>{myPoke}</p>;
            })
            .reverse()}
        </div>
        <div>
          {enermyPokeList
            .map((enermyPoke, index) => {
              return <p key={index}>{enermyPoke}</p>;
            })
            .reverse()}
        </div>
      </div>
    </div>
  );
}
