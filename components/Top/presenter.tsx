import { Poke } from "@/types/Poke";
import Image from "next/image";
import { ChangeEvent, Fragment, KeyboardEvent } from "react";

type Props = {
  pokeList: Poke[];
  isMyTurn: boolean;
  sentPokeName: string;
  targetPoke: Poke | undefined;
  pokeErr: string;
  myPokeList: Poke[];
  enermyPokeList: Poke[];
  onChangePoke: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeydown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSubmitPoke: () => void;
};

export default function TopPresenter({
  pokeList,
  isMyTurn,
  sentPokeName,
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
      <div className="text-center">{targetPoke?.name.japanese}</div>
      <div className="text-center m-3">
        <p className="text-rose-500 h-10">{pokeErr}</p>
        <input
          id="poke-input"
          list="poke-list"
          className="m-3 h-10"
          value={sentPokeName}
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
              return (
                <Fragment key={index}>
                  <div className="h-12 border-b">
                    <span>{myPoke.name.japanese}</span>
                    {myPoke.imgPath && (
                      <Image
                        className="inline-block"
                        height={50}
                        width={50}
                        src={myPoke.imgPath}
                        alt=""
                      />
                    )}
                  </div>
                </Fragment>
              );
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
              return (
                <Fragment key={index}>
                  <div className="h-12 border-b">
                    <span>{enermyPoke.name.japanese}</span>
                    {enermyPoke.imgPath && (
                      <Image
                        className="inline-block"
                        height={50}
                        width={50}
                        src={enermyPoke.imgPath}
                        alt=""
                      />
                    )}
                  </div>
                </Fragment>
              );
            })
            .reverse()}
        </div>
      </div>
    </>
  );
}
