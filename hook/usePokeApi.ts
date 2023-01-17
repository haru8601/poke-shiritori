import { PokeApi } from "@/types/PokeApi";
import axios, { AxiosInstance } from "axios";

export const usePokeApi = () => {
  const createBase = (): AxiosInstance => {
    return axios.create({
      baseURL: "https://pokeapi.co/api/v2/",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const fetchPoke = async (id: number): Promise<PokeApi> => {
    const instance = createBase();
    return await instance
      .get(`pokemon/${id}`)
      .then((response) => response.data);
  };
  return { fetchPoke } as const;
};
