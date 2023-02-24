import { PokeType } from "@/types/Poke";

export const typeMap: {
  [T in PokeType as T]: {
    strong: PokeType[];
    weak: PokeType[];
    noEffect: PokeType[];
  };
} = {
  Normal: {
    strong: [],
    weak: ["Rock", "Steel"],
    noEffect: ["Ghost"],
  },
  Fire: {
    strong: ["Grass", "Ice", "Bug", "Steel"],
    weak: ["Fire", "Water", "Rock", "Dragon"],
    noEffect: [],
  },
  Water: {
    strong: ["Fire", "Ground", "Rock"],
    weak: ["Water", "Grass", "Dragon"],
    noEffect: [],
  },
  Grass: {
    strong: ["Water", "Ground", "Rock"],
    weak: ["Fire", "Grass", "Poison", "Flying", "Bug", "Dragon", "Steel"],
    noEffect: [],
  },
  Electric: {
    strong: ["Water", "Flying"],
    weak: ["Electric", "Grass", "Dragon"],
    noEffect: ["Ground"],
  },
  Ice: {
    strong: ["Grass", "Ground", "Flying", "Dragon"],
    weak: ["Fire", "Water", "Ice", "Steel"],
    noEffect: [],
  },
  Fighting: {
    strong: ["Normal", "Ice", "Rock", "Dark", "Steel"],
    weak: ["Poison", "Flying", "Psychic", "Bug", "Fairy"],
    noEffect: ["Ghost"],
  },
  Poison: {
    strong: ["Grass", "Fairy"],
    weak: ["Poison", "Ground", "Rock", "Ghost"],
    noEffect: ["Steel"],
  },
  Ground: {
    strong: ["Fire", "Electric", "Poison", "Rock", "Steel"],
    weak: ["Grass", "Bug"],
    noEffect: ["Flying"],
  },
  Flying: {
    strong: ["Grass", "Fighting", "Bug"],
    weak: ["Electric", "Rock", "Steel"],
    noEffect: [],
  },
  Psychic: {
    strong: ["Fighting", "Poison"],
    weak: ["Psychic", "Steel"],
    noEffect: ["Dark"],
  },
  Bug: {
    strong: ["Grass", "Psychic", "Dark"],
    weak: ["Fire", "Fighting", "Poison", "Flying", "Ghost", "Steel", "Fairy"],
    noEffect: [],
  },
  Rock: {
    strong: ["Fire", "Ice", "Flying", "Bug"],
    weak: ["Fighting", "Ground", "Steel"],
    noEffect: [],
  },
  Ghost: {
    strong: ["Psychic", "Ghost"],
    weak: ["Dark"],
    noEffect: ["Normal"],
  },
  Dragon: {
    strong: ["Dark"],
    weak: ["Steel"],
    noEffect: ["Fairy"],
  },
  Dark: {
    strong: ["Psychic", "Ghost"],
    weak: ["Fighting", "Dark", "Fairy"],
    noEffect: [],
  },
  Steel: {
    strong: ["Ice", "Rock", "Fairy"],
    weak: ["Fire", "Ice", "Grass", "Steel"],
    noEffect: [],
  },
  Fairy: {
    strong: ["Fighting", "Dragon", "Dark"],
    weak: ["Fire", "Poison", "Steel"],
    noEffect: [],
  },
};
