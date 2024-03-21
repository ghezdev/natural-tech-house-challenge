import { Suspense, useEffect, useState } from "react";
import {
  getAllPokemon,
  useGetAllPokemonQuery,
} from "@/lib/features/pokemon/pokemonSlice";
import PokemonCard from "@/components/PokemonCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TYPES_POKEMON } from "@/lib/const";
import useDebounce from "@/hooks/useDebounce";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { TTypesPokemon } from "@/types/pokemon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DetailPokemonDialog from "@/components/DetailPokemonDialog";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";
import { Badge } from "@/components/ui/badge";
import { makeStore } from "@/lib/store";
import SearchPokemon from "./SearchPokemon";
import GridPokemon from "./GridPokemon";
import PaginationPokemon from "./PaginationPokemon";
import TypePokemon from "./TypePokemon";

type Props = {
  searchParams?: {
    name?: string;
    page?: string;
    type?: string;
  };
};

async function getAllPokemons(name: string, type: TTypesPokemon) {
  const store = makeStore();

  const { data: pokemons } = await store.dispatch(
    getAllPokemon.initiate({
      name: name || undefined,
      type: type || undefined,
      page: 0,
    })
  );

  return pokemons;
}

export default async function Page({ searchParams }: Props) {
  const nameParam = searchParams?.name || "";
  const pageParam = Number(searchParams?.page) || 0;
  const typeParam = (searchParams?.type as TTypesPokemon) || undefined;

  const pokemons = await getAllPokemons(nameParam, typeParam);

  if (!pokemons) return <div>error in page</div>;

  const { maxPage } = pokemons;

  return (
    <div className="container pt-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 h-fit">
        <SearchPokemon />
        <TypePokemon />
      </div>
      <Suspense
        key={nameParam + pageParam + typeParam}
        fallback={<p>loading..</p>}
      >
        <GridPokemon name={nameParam} page={pageParam} type={typeParam} />
      </Suspense>
      {nameParam.length === 0 && <PaginationPokemon maxPage={maxPage} />}
    </div>
  );
}

