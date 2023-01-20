import { PATH } from "@/const/path";
import { pokeColorMap } from "@/const/pokeColorMap";
import { Poke } from "@/types/Poke";
import Image from "next/image";
import { ChangeEvent, Fragment, KeyboardEvent } from "react";
import {
  Button,
  Card,
  Form,
  InputGroup,
  Spinner,
  Stack,
} from "react-bootstrap";

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
  onReload: () => void;
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
  onReload,
}: Props) {
  return (
    <Stack className="justify-content-around">
      <Card.Header className="m-3 mb-5 d-flex justify-content-between">
        <div className="d-inline-flex border-2 border-bottom border-dark">
          <Card.Title className="fs-1 fw-bold">ポケモンしりとり</Card.Title>
          <Image
            className="inline-block"
            height={40}
            width={40}
            src={PATH.defaultImg}
            alt=""
          />
        </div>
        <Button variant="dark" type="submit" onClick={onReload}>
          目の前を真っ暗にする
        </Button>
      </Card.Header>
      {targetPoke && (
        <div
          className="px-2 rounded d-flex justify-content-center mx-auto"
          style={{
            height: "40px",
            width: "20%",
            backgroundColor:
              targetPoke.type && pokeColorMap[targetPoke.type[0]],
          }}
        >
          <span style={{ lineHeight: "40px" }}>{targetPoke.name.japanese}</span>
          <Image
            className="inline-block"
            height={40}
            width={40}
            src={targetPoke.imgPath ?? "/pikachu.png"}
            alt=""
          />
        </div>
      )}
      <div
        style={{ width: "90%" }}
        className="d-flex mt-3 mb-2 justify-content-end text-center"
      >
        <span style={{ lineHeight: "40px" }} className="mx-2">
          最初のポケモン:
        </span>
        <div
          className="px-2 rounded d-flex justify-content-center"
          style={{
            height: "40px",
            backgroundColor: firstPoke.type && pokeColorMap[firstPoke.type[0]],
          }}
        >
          <span style={{ lineHeight: "40px" }}>{firstPoke.name.japanese}</span>
          <Image
            style={{ zIndex: 100 }}
            className="inline-block float-start"
            height={40}
            width={40}
            src={firstPoke.imgPath ?? "/pikachu.png"}
            alt=""
          />
        </div>
      </div>
      {finishType != "" &&
        (finishType == "win" ? <p>You Win!</p> : <p>You Lose</p>)}
      <InputGroup style={{ width: "40%" }} className="mx-auto">
        <Form.Control
          id="poke-input"
          list="poke-list"
          value={sentPokeName}
          onChange={onChangePoke}
          onKeyDown={onKeydown}
          placeholder="ポケモンを入力してください"
          disabled={!isMyTurn || finishType != ""}
          isInvalid={pokeErr != ""}
        />
        <datalist id="poke-list">
          {pokeList.map((poke) => {
            return <option key={poke.id}>{poke.name.japanese}</option>;
          })}
        </datalist>
        <Button
          variant="primary"
          className="rounded-end"
          type="submit"
          onClick={onSubmitPoke}
          disabled={!isMyTurn || finishType != ""}
        >
          送信
        </Button>
        <Form.Control.Feedback type="invalid" tooltip>
          {pokeErr}
        </Form.Control.Feedback>
      </InputGroup>
      <div
        style={{ width: "90%", height: "40px" }}
        className="d-inline-flex mx-auto justify-content-end"
      >
        {!isMyTurn && (
          <Spinner animation="border" variant="secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </div>
      <Stack
        style={{ height: "40vh", overflow: "scroll" }}
        className="justify-content-around"
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
                    <Image
                      style={{ zIndex: index }}
                      className="inline-block float-start"
                      height={50}
                      width={50}
                      src={myPoke.imgPath ?? "/pikachu.png"}
                      alt=""
                    />
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
                    <Image
                      style={{ zIndex: index }}
                      className="inline-block float-start"
                      height={50}
                      width={50}
                      src={enermyPoke.imgPath ?? "/pikachu.png"}
                      alt=""
                    />
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
