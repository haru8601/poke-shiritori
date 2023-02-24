import { typeMap } from "@/const/typeMap";
import { Poke } from "@/types/Poke";

export default function getCompatibility(attacker: Poke, defender: Poke) {
  let maxEffect = 0;
  attacker.type.forEach((attackType) => {
    let effect = 1.0;
    defender.type.forEach((defenceType) => {
      if (typeMap[attackType].strong.includes(defenceType)) {
        effect *= 2;
      } else if (typeMap[attackType].weak.includes(defenceType)) {
        effect /= 2;
      } else if (typeMap[attackType].noEffect.includes(defenceType)) {
        effect *= 0;
      }
    });
    maxEffect = Math.max(maxEffect, effect);
  });
  return maxEffect;
}
