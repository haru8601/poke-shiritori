export const useSleep = () => {
  const sleep = async (mills: number) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(2);
        resolve("");
      }, mills);
    });
  };
  return { sleep } as const;
};
