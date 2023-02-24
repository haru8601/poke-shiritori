import { ComponentProps, Fragment } from "react";
import { Stack } from "react-bootstrap";
import { CONFIG } from "@/const/config";
import { pokeColorMap } from "@/const/pokeColorMap";
import PokeHistory from "./container";
import PokeCard from "../PokeCard/container";

type Props = ComponentProps<typeof PokeHistory>;

export default function PokeHistoryPresenter({ myPokeList, isTarget }: Props) {
  return (
    <Stack
      style={{ width: "40%" }}
      className={`text-center border border-3 rounded ${
        isTarget ? "border-primary" : ""
      }`}
    >
      {myPokeList
        .map((myPoke, index) => {
          return (
            <Fragment key={index}>
              <div
                className="border-bottom d-flex justify-content-center"
                style={{
                  height: `${CONFIG.spaceBasis}px`,
                  backgroundColor: myPoke.type && pokeColorMap[myPoke.type[0]],
                }}
              >
                <PokeCard targetPoke={myPoke} zIndex={index + 100}></PokeCard>
              </div>
            </Fragment>
          );
        })
        .reverse()}
    </Stack>
  );
}
