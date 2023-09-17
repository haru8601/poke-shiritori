import { useCallback } from "react";

export const useTimer = () => {
  const sleep = useCallback(async (mills: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, mills);
    });
  }, []);
  return { sleep } as const;
};
