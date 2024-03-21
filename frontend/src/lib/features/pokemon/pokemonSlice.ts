import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TDetailPokemon, TPokemonList, TTypesPokemon } from "@/types/pokemon";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "../../store";

type TGetAllPokemonQueryParams = Partial<{
  name: string;
  type: TTypesPokemon;
  page: number;
}>;

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/pokemon",
  }),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      // when persisting the api reducer
      // if (action.key === 'key used with redux-persist') {
      //   return action.payload
      // }

      return action.payload[reducerPath];
    }
  },
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

export const { getAllPokemon, getPokemonByName } = pokemonApi.endpoints;

