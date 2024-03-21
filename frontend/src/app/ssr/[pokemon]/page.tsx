import Image from "next/image";
import React from "react";
import { makeStore } from "@/lib/store";
import {
  getAllPokemon,
  getPokemonByName,
} from "@/lib/features/pokemon/pokemonSlice";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ICONS_STAT } from "@/lib/const";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { arrayRange } from "@/lib/utils";

export async function generateStaticParams() {
  const store = makeStore();

  const { data: firstPokemonPaginated } = await store.dispatch(
    getAllPokemon.initiate({ page: 0 })
  );

  if (!firstPokemonPaginated) throw new Error("No pokemons");

  const resPokemonsPaginated = await Promise.all(
    arrayRange(1, firstPokemonPaginated.maxPage).map(async (page) => {
      const { data: pokemonPaginated } = await store.dispatch(
        getAllPokemon.initiate({ page })
      );

      if (!pokemonPaginated) throw new Error("No pokemons");

      return pokemonPaginated;
    })
  );

  const pokemonsPaginated = [
    ...firstPokemonPaginated.pokemons,
    ...resPokemonsPaginated.flatMap(({ pokemons }) => pokemons),
  ];

  return pokemonsPaginated.map(({ name }) => ({ pokemon: name }));
}

async function getPokemonByPokemonName(name: string) {
  const store = makeStore();

  const { data: pokemon } = await store.dispatch(
    getPokemonByName.initiate(name)
  );

  if (!pokemon) throw new Error("No pokemon");

  return pokemon;
}

type Props = {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number];
};

export default async function Page({ params }: Props) {
  const { pokemon: pokemonName } = params;

  const pokemon = await getPokemonByPokemonName(pokemonName);

  return (
    <div className="container pt-20 h-full flex flex-col">
      <Link href="./">
        <Button
          className="static sm:absolute pl-1 pr-2 uppercase"
          variant="ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          volver
        </Button>
      </Link>
      <Image
        src={pokemon.image}
        className="mx-auto"
        width={100}
        height={100}
        alt={`${pokemon.name} image`}
        priority
      />
      <p className="uppercase font-bold text-xl text-center mb-2">
        {pokemon.name}
      </p>
      <div className="flex gap-2 justify-center">
        {pokemon.types.map((type) => (
          <Badge key={`${pokemon.name}-${type}`} pokemon={type}>
            {type}
          </Badge>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-6 text-center mt-4 mx-auto">
        <div>
          <p className="font-bold capitalize">Height</p>
          <p>{pokemon.height || "-"}</p>
        </div>
        <div>
          <p className="font-bold capitalize">Base Experience</p>
          <p>{pokemon.baseExperience || "-"}</p>
        </div>
        <div>
          <p className="font-bold capitalize">Weight</p>
          <p>{pokemon.weight || "-"}</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-20 gap-y-2 sm:gap-y-4 mx-auto">
        {pokemon.stats.map(({ baseStat, effort, typeStat }) => (
          <div
            key={`${pokemon.name}-${typeStat}`}
            className="flex items-center gap-2"
          >
            <Image
              className="h-fit w-fit"
              src={ICONS_STAT[typeStat as keyof typeof ICONS_STAT]}
              alt={`${typeStat} ${pokemon.name}`}
              width={20}
              height={20}
            />
            <div className="flex-grow text-center">
              <p className="font-bold capitalize">
                {typeStat.replaceAll("-", " ")}
              </p>
              <p>{baseStat || "-"}</p>
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <p className="font-bold text-lg mb-2 text-center">ABILITIES</p>
      <div className="flex flex-col gap-4 text-center">
        {pokemon.abilities.map((ability) => (
          <div key={`${pokemon.name}-${ability.name}`}>
            <p className="capitalize font-bold">{ability.name || "-"}</p>
            <p>{ability.description || "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

