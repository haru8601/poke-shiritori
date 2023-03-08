import { useCallback } from "react";
import { PATH } from "@/const/path";
import { PokeApi } from "@/types/PokeApi";

export const usePokeApi = () => {
  const fetchPoke = useCallback(async (id: number): Promise<PokeApi | void> => {
    return await fetch(`${PATH.pokeapiBaseUrl}/${id}`)
      .then((response: Response) => {
        if (!response.ok) {
          console.log("failed to fetch data from pokeApi.");
          return;
        }
        return response.json() as Promise<PokeApi>;
      })
      .catch((err: Error) => {
        console.log(err);
        return;
      });
  }, []);
  return { fetchPoke } as const;
};
