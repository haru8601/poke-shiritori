import { useCallback } from "react";

export const useTimer = () => {
  const sleep = useCallback(async (mills: number) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, mills);
    });
  }, []);
  return { sleep } as const;
};
