import { PATH } from "@/const/path";
import { pokeColorMap } from "@/const/pokeColorMap";
import { Poke } from "@/types/Poke";
import Image from "next/image";
import { ChangeEvent, Fragment, KeyboardEvent } from "react";
import {
  Button,
  Form,
  InputGroup,
  OverlayTrigger,
  Spinner,
  Stack,
  Tooltip,
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
  spaceBasis: number;
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
  spaceBasis,
  onChangePoke,
  onKeydown,
  onSubmitPoke,
  onReload,
}: Props) {
  return (
    <>
      {finishType != "" && (
        <h3
          style={{
            fontSize: "5rem",
            zIndex: 1000,
            opacity: 0,
            animation: "fade-keyframe 5s ease 0.5s 1 forwards",
          }}
          className="text-success text-uppercase position-fixed top-50 start-50 translate-middle text-nowrap"
        >
          you {finishType} {finishType == "win" ? "!!" : "..."}
        </h3>
      )}
      <Stack
        style={{
          animation:
            finishType != "" ? "fade-keyframe-bg 5s ease 0.5s 1 forwards" : "",
        }}
        className="justify-content-around"
      >
        <header className="m-3 mb-5 d-flex justify-content-between">
          <div className="d-inline-flex border-2 border-bottom border-dark">
            <h1 className="text-dark fs-1 fw-bold">ポケモンしりとり</h1>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>made by haroot</Tooltip>}
            >
              <Image
                className="inline-block"
                height={spaceBasis}
                width={spaceBasis}
                src={PATH.defaultImg}
                alt=""
              />
            </OverlayTrigger>
          </div>
          {finishType != "" && (
            <h3 className="my-0 text-success text-uppercase">
              you {finishType} {finishType == "win" ? "!!" : "..."}
            </h3>
          )}
          <Button variant="dark" type="submit" onClick={onReload}>
            目の前を真っ暗にする
          </Button>
        </header>
        {targetPoke && (
          <div
            className="px-2 rounded d-flex align-items-center justify-content-center mx-auto"
            style={{
              height: `${spaceBasis}px`,
              width: "20%",
              backgroundColor:
                targetPoke.type && pokeColorMap[targetPoke.type[0]],
            }}
          >
            <span>{targetPoke.name.japanese}</span>
            <Image
              className="inline-block"
              height={spaceBasis * 0.8}
              width={spaceBasis * 0.8}
              src={targetPoke.imgPath ?? "/pikachu.png"}
              alt=""
            />
          </div>
        )}
        <div
          style={{ width: "90%" }}
          className="d-flex mt-3 mb-2 justify-content-end text-center"
        >
          <span className="mx-2">最初のポケモン:</span>
          <div
            className="px-2 rounded d-flex align-items-center justify-content-center"
            style={{
              height: `${spaceBasis * 0.8}px`,
              backgroundColor:
                firstPoke.type && pokeColorMap[firstPoke.type[0]],
            }}
          >
            <span>{firstPoke.name.japanese}</span>
            <Image
              style={{ zIndex: 100 }}
              className="inline-block float-start"
              height={spaceBasis * 0.8}
              width={spaceBasis * 0.8}
              src={firstPoke.imgPath ?? "/pikachu.png"}
              alt=""
            />
          </div>
        </div>
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
          style={{ width: "90%", height: `${spaceBasis}px` }}
          className="d-inline-flex mx-auto justify-content-end"
        >
          {!isMyTurn && finishType == "" && (
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
                        height: `${spaceBasis}px`,
                        backgroundColor:
                          myPoke.type && pokeColorMap[myPoke.type[0]],
                      }}
                    >
                      <span className="align-self-center">
                        {myPoke.name.japanese}
                      </span>
                      <Image
                        style={{ zIndex: index + 100 }}
                        className="inline-block float-start"
                        height={spaceBasis * 1.2}
                        width={spaceBasis * 1.2}
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
                        height: `${spaceBasis}px`,
                        backgroundColor:
                          enermyPoke.type && pokeColorMap[enermyPoke.type[0]],
                      }}
                    >
                      <span className="align-self-center">
                        {enermyPoke.name.japanese}
                      </span>
                      <Image
                        style={{ zIndex: index + 100 }}
                        className="inline-block float-start"
                        height={spaceBasis * 1.2}
                        width={spaceBasis * 1.2}
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
        <footer className="m-3 d-flex justify-content-end">
          <Button href={PATH.homePage} variant="link" target="blank">
            作者のHP
          </Button>
        </footer>
      </Stack>
    </>
  );
}
