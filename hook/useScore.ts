import axios, { AxiosResponse } from "axios";
import { ResultSetHeader } from "mysql2";
import { useCallback } from "react";
import { Score } from "@/types/Score";

export const useScore = () => {
  const createBase = () => {
    return axios.create({ baseURL: "api/mysql" });
  };
  const fetchScoreAll = useCallback(async (): Promise<Score[] | void> => {
    const instance = createBase();
    return await instance
      .get("select")
      .then((response: AxiosResponse<Score[]>) => response?.data)
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const storeScore = useCallback(
    async (
      param: Pick<Score, "user" | "score">
    ): Promise<ResultSetHeader | void> => {
      const instance = createBase();
      return await instance
        .post("insert", {
          user: param.user,
          score: param.score,
        })
        .then(
          (response: AxiosResponse<ResultSetHeader | void>) => response?.data
        )
        .catch((err) => {
          console.log(err);
        });
    },
    []
  );
  const updateName = async (
    param: Pick<Score, "id" | "user">
  ): Promise<ResultSetHeader | void> => {
    if (param.id < 0) {
      console.log(`id: ${param.id}のレコードは存在しません`);
      return;
    }
    const instance = createBase();
    return await instance
      .post("update", {
        id: param.id,
        user: param.user,
      })
      .then((response: AxiosResponse<ResultSetHeader | void>) => response?.data)
      .catch((err) => {
        console.log(err);
      });
  };
  return { fetchScoreAll, storeScore, updateName } as const;
};
