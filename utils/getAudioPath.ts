import path from "path";
import { PATH } from "@/const/path";

export const getAudioPath = (id: string) => {
  return path.join(process.cwd(), PATH.audio, `${id}.wav`);
};
