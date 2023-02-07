import { Score } from "@/types/Score";
import axios, { AxiosResponse } from "axios";
import { ResultSetHeader } from "mysql2";
import { useCallback } from "react";

export const useScore = () => {
  const createBase = () => {
    return axios.create({ baseURL: "api/mysql" });
  };
  const fetchScoreAll = useCallback(async () => {
    const instance = createBase();
    return await instance
      .get("select")
      .then((response: AxiosResponse<Score[]>) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const storeScore = useCallback(
    async (
      param: Pick<Score, "user" | "score">
    ): Promise<AxiosResponse<ResultSetHeader> | void> => {
      const instance = createBase();
      return await instance
        .post("insert", {
          user: param.user,
          score: param.score,
        })
        .catch((err) => {
          console.log(err);
        });
    },
    []
  );
  const updateName = async (param: Pick<Score, "id" | "user">) => {
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
      .catch((err) => {
        console.log(err);
      });
  };
  return { fetchScoreAll, storeScore, updateName } as const;
};
