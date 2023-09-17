import { Poke } from "@/types/Poke";
import { PATH } from "./path";

export const NOT_FOUND_POKE: Poke = {
  id: 0,
  base: { h: 0, a: 0, b: 0, c: 0, d: 0, s: 0 },
  name: { japanese: "見つかりませんでした。。" },
  type: ["Normal"],
  imgPath: PATH.defaultImg,
  status: {
    owner: "enermy",
    order: 99999,
  },
};
