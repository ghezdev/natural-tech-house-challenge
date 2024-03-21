import React from "react";
import { makeStore } from "@/lib/store";
import { getAllPokemon } from "@/lib/features/pokemon/pokemonSlice";
import PokemonCard from "@/components/PokemonCard";
import { TTypesPokemon } from "@/types/pokemon";
import PaginationPokemon from "./PaginationPokemon";

async function getAllPokemons(name: string, type: TTypesPokemon, page: number) {
  const store = makeStore();

  const { data: pokemons } = await store.dispatch(
    getAllPokemon.initiate({
      name: name || undefined,
      type: type || undefined,
      page: page,
    })
  );

  return pokemons;
}

type Props = {
  name: string;
  page: number;
  type: TTypesPokemon;
};

export default async function GridPokemon({ name, page, type }: Props) {
  const pokemons = await getAllPokemons(name, type, page);

  if (!pokemons)
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <p className="text-4xl font-bold">Pokemon not found</p>
        <p className="text-xl">Try again with another filters</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-20 h-20"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    );

  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 my-8 gap-8"
        data-testid="grid-pokemons"
      >
        {pokemons.pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      {name.length === 0 && <PaginationPokemon maxPage={pokemons.maxPage} />}
    </>
  );
}

