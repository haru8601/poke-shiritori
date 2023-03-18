import path from "path";
import { AUDIO } from "@/const/audio";
import { PATH } from "@/const/path";

export const getAudioRandomPath = (type: keyof typeof AUDIO) => {
  return path.join(
    process.cwd(),
    PATH.audio,
    `${type}_${AUDIO[type][Math.floor(Math.random() * AUDIO[type].length)]}.wav`
  );
};
