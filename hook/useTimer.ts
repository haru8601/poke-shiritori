export const useSleep = () => {
  const sleep = async (mills: number) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, mills);
    });
  };
  return { sleep } as const;
};
