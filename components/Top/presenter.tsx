import { pokeColorMap } from "@/const/pokeColorMap";
import { Poke } from "@/types/Poke";
import Image from "next/image";
import { ChangeEvent, Fragment, KeyboardEvent } from "react";
import { Button, Card, Form, InputGroup, Stack } from "react-bootstrap";

type Props = {
  pokeList: Poke[];
  isMyTurn: boolean;
  firstPoke: Poke;
  targetPoke: Poke;
  sentPokeName: string;
  pokeErr: string;
  myPokeList: Poke[];
  enermyPokeList: Poke[];
  finishType: "" | "win" | "lose";
  onChangePoke: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeydown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSubmitPoke: () => void;
};

export default function TopPresenter({
  pokeList,
  isMyTurn,
  firstPoke,
  targetPoke,
  sentPokeName,
  pokeErr,
  myPokeList,
  enermyPokeList,
  finishType,
  onChangePoke,
  onKeydown,
  onSubmitPoke,
}: Props) {
  return (
    <Stack className="justify-content-around">
      <Card.Header className="m-3">
        <Card.Title className="fs-1 fw-bold">ポケモンしりとり</Card.Title>
      </Card.Header>
      {targetPoke && (
        <div
          className="text-center mx-auto"
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
      <div
        style={{ width: "90%" }}
        className="d-flex justify-content-end text-center"
      >
        <span style={{ lineHeight: "40px" }} className="mx-2">
          最初のお題:
        </span>
        <div
          className="px-2 rounded d-flex justify-content-center"
          style={{
            height: "40px",
            backgroundColor: firstPoke.type && pokeColorMap[firstPoke.type[0]],
          }}
        >
          <span style={{ lineHeight: "40px" }}>{firstPoke.name.japanese}</span>
          {firstPoke.imgPath && (
            <Image
              style={{ zIndex: 100 }}
              className="inline-block float-start"
              height={50}
              width={50}
              src={firstPoke.imgPath}
              alt=""
            />
          )}
        </div>
      </div>
      <p className="text-danger">{pokeErr}</p>
      {finishType != "" &&
        (finishType == "win" ? <p>You Win!</p> : <p>You Lose</p>)}
      <InputGroup>
        <Form.Control
          id="poke-input"
          list="poke-list"
          value={sentPokeName}
          onChange={onChangePoke}
          onKeyDown={onKeydown}
          placeholder="ポケモンを入力してください"
          disabled={!isMyTurn || finishType != ""}
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
          disabled={!isMyTurn || finishType != ""}
        >
          送信
        </Button>
      </InputGroup>
      <Stack
        style={{ height: "50vh", overflow: "scroll" }}
        className="justify-content-around mt-3"
        direction="horizontal"
      >
        <Stack
          style={{ width: "40%" }}
          className={`text-center border border-3 rounded ${
            isMyTurn ? "border-primary" : ""
          }`}
        >
          {myPokeList
            .map((myPoke, index) => {
              return (
                <Fragment key={index}>
                  <div
                    className="border-bottom d-flex justify-content-center"
                    style={{
                      height: "40px",
                      backgroundColor:
                        myPoke.type && pokeColorMap[myPoke.type[0]],
                    }}
                  >
                    <span style={{ lineHeight: "40px" }}>
                      {myPoke.name.japanese}
                    </span>
                    {myPoke.imgPath && (
                      <Image
                        style={{ zIndex: index }}
                        className="inline-block float-start"
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
          className={`text-center border border-3 rounded ${
            isMyTurn ? "" : "border-primary "
          }`}
        >
          {enermyPokeList
            .map((enermyPoke, index) => {
              return (
                <Fragment key={index}>
                  <div
                    className="border-bottom d-flex justify-content-center"
                    style={{
                      height: "40px",
                      backgroundColor:
                        enermyPoke.type && pokeColorMap[enermyPoke.type[0]],
                    }}
                  >
                    <span style={{ lineHeight: "40px" }}>
                      {enermyPoke.name.japanese}
                    </span>
                    {enermyPoke.imgPath && (
                      <Image
                        style={{ zIndex: index }}
                        className="inline-block float-start"
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
