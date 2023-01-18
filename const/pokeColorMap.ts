import { PokeType } from "@/types/Poke";

export const pokeColorMap: {
  [K in PokeType]: string;
} = {
  Normal: "neutral-200",
  Fire: "rose-500",
  Water: "blue-500",
  Grass: "emerald-500",
  Electric: "yellow-500",
  Ice: "cyan-500",
  Fighting: "orange-400",
  Poison: "purple-500",
  Ground: "orange-700",
  Flying: "sky-300",
  Psychic: "pink-500",
  Bug: "lime-500",
  Rock: "amber-700",
  Ghost: "violet-700",
  Dragon: "blue-900",
  Dark: "neutral-800",
  Steel: "neutral-600",
  Fairy: "pink-300",
};
