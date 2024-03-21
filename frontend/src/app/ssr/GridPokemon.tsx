import React from "react";
import { makeStore } from "@/lib/store";
import { getAllPokemon } from "@/lib/features/pokemon/pokemonSlice";
import PokemonCard from "@/components/PokemonCard";
import { TTypesPokemon } from "../../types/pokemon";

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

  if (!pokemons) return <div>ERROR</div>;

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 my-8 gap-8"
      data-testid="grid-pokemons"
    >
      {pokemons.pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

