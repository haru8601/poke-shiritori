import { pokeColorMap } from "@/const/pokeColorMap";
import { ComponentProps, Fragment } from "react";
import { Image, Stack } from "react-bootstrap";
import PokeHistory from "./container";

type Props = ComponentProps<typeof PokeHistory>;

export default function PokeHistoryPresenter({
  myPokeList,
  isMyTurn,
  spaceBasis,
}: Props) {
  return (
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
                  backgroundColor: myPoke.type && pokeColorMap[myPoke.type[0]],
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
  );
}
