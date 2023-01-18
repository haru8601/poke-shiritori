import { pokeColorMap } from "@/const/pokeColorMap";
import { Poke } from "@/types/Poke";
import Image from "next/image";
import { ChangeEvent, Fragment, KeyboardEvent } from "react";
import { Button, Card, Form, InputGroup, Stack } from "react-bootstrap";

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
    <Stack className="justify-content-around">
      <Card.Header className="m-3">
        <Card.Title>ポケモンしりとり</Card.Title>
      </Card.Header>
      {targetPoke && (
        <div
          className="border-bottom text-center"
          style={{
            height: "50px",
          }}
        >
          <span>{targetPoke.name.japanese}</span>
          {targetPoke.imgPath && (
            <Image
              className="inline-block"
              height={50}
              width={50}
              src={targetPoke.imgPath}
              alt=""
            />
          )}
        </div>
      )}
      <p className="text-danger">{pokeErr}</p>
      <InputGroup>
        <Form.Control
          id="poke-input"
          list="poke-list"
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
        <Button
          variant="primary"
          type="submit"
          onClick={onSubmitPoke}
          disabled={!isMyTurn}
        >
          送信
        </Button>
      </InputGroup>
      <Stack
        style={{ height: "50vh", overflow: "scroll" }}
        className="justify-content-around m-3 "
        direction="horizontal"
      >
        <Stack
          style={{ width: "40%" }}
          className={`text-center ${
            isMyTurn ? "border border-3 border-primary rounded" : ""
          }`}
        >
          {myPokeList
            .map((myPoke, index) => {
              return (
                <Fragment key={index}>
                  <div
                    className="border-bottom"
                    style={{
                      height: "50px",
                      backgroundColor: pokeColorMap[myPoke?.type[0]],
                    }}
                  >
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
        </Stack>
        <Stack
          style={{ width: "40%" }}
          className={`text-center ${
            isMyTurn ? "" : "border border-primary rounded"
          }`}
        >
          {enermyPokeList
            .map((enermyPoke, index) => {
              return (
                <Fragment key={index}>
                  <div
                    className="border-bottom"
                    style={{
                      height: "50px",
                      backgroundColor: pokeColorMap[enermyPoke?.type[0]],
                    }}
                  >
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
        </Stack>
      </Stack>
    </Stack>
  );
}
