import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TDetailPokemon, TPokemonList, TTypesPokemon } from "@/types/pokemon";

type TGetAllPokemonQueryParams = Partial<{
  name: string;
  type: TTypesPokemon;
  page: number;
}>;

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/pokemon",
  }),
  endpoints: (builder) => ({
    getAllPokemon: builder.query<TPokemonList, TGetAllPokemonQueryParams>({
      query: ({ name, type, page }) => ({
        url: "/",
        method: "GET",
        params: { name, type, page },
      }),
    }),
    getPokemonByName: builder.query<TDetailPokemon, string>({
      query: (pokemonName) => ({
        url: `/${pokemonName}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllPokemonQuery, useGetPokemonByNameQuery } = pokemonApi;

