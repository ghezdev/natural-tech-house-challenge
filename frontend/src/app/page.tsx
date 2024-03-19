"use client";
import { useEffect, useState } from "react";
import { useGetAllPokemonQuery } from "@/lib/features/pokemon/pokemonSlice";
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

export default function Page() {
  const [searchPokemon, setSearchPokemon] = useState("");
  const [searchType, setSearchType] = useState<TTypesPokemon | undefined>(
    undefined
  );
  const [page, setPage] = useState(0);
  const [inputPage, setInputPage] = useState("");
  const [key, setKey] = useState(+new Date());
  const debouncedSearchPokemon = useDebounce(searchPokemon, 500);
  const debouncedPage = useDebounce(inputPage, 500);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setPage(debouncedPage ? Number(debouncedPage) - 1 : 0);
  }, [debouncedPage]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearchPokemon, searchType]);

  const {
    data: pokemons,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useGetAllPokemonQuery({
    name:
      debouncedSearchPokemon.length === 0 ? undefined : debouncedSearchPokemon,
    type: searchType,
    page,
  });

  return (
    <div className="container pt-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 h-fit">
        <div>
          <Label htmlFor="pokemon-search">Buscar por nombre</Label>
          <Input
            className="w-full md:w-80"
            type="text"
            name="pokemon-search"
            placeholder="Escribe el nombre de un pokemon"
            value={searchPokemon}
            onChange={(e) => setSearchPokemon(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="pokemon-type-search">Buscar por tipo</Label>
          <Select
            key={key}
            name="pokemon-type-search"
            onValueChange={(value) => setSearchType(value as TTypesPokemon)}
          >
            <SelectTrigger className="w-full md:w-60">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              <>
                <Button
                  className="w-full"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchType(undefined);
                    setKey(+new Date());
                  }}
                >
                  Clear selection
                </Button>
                <Separator className="my-2" />
                {TYPES_POKEMON.map((type) => (
                  <SelectItem key={`select-${type}`} value={type}>
                    <Badge className="w-fit" pokemon={type}>
                      {type}
                    </Badge>
                  </SelectItem>
                ))}
              </>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isLoading || isFetching ? (
        <div className="flex flex-grow justify-center items-center">
          <Image
            className="animate-spin"
            src={"pokeball.svg"}
            alt="pokeball loader"
            width={100}
            height={100}
          />
        </div>
      ) : isSuccess && pokemons.pokemons.length > 0 ? (
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 my-8 gap-8"
            data-testid="grid-pokemons"
          >
            {pokemons.pokemons.map((pokemon) =>
              isDesktop ? (
                <Dialog key={pokemon.name}>
                  <DialogTrigger>
                    <PokemonCard pokemon={pokemon} />
                  </DialogTrigger>
                  <DetailPokemonDialog pokemonName={pokemon.name} />
                </Dialog>
              ) : (
                <Drawer key={pokemon.name}>
                  <DrawerTrigger>
                    <PokemonCard pokemon={pokemon} />
                  </DrawerTrigger>
                  <DetailPokemonDialog pokemonName={pokemon.name} />
                </Drawer>
              )
            )}
          </div>
          <Pagination className="pb-8">
            <PaginationContent>
              <PaginationItem>
                <Button
                  className="px-2"
                  variant="ghost"
                  onClick={() => {
                    if (page > 0) setPage(page - 1);
                  }}
                >
                  {"< Previous"}
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  className="px-2"
                  variant="ghost"
                  onClick={() => setPage(1)}
                >
                  1
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Input
                  className="w-16"
                  type="text"
                  value={inputPage}
                  onChange={(e) => {
                    const { value } = e.target;
                    const isOnlyNumbers = /^[0-9]*/.test(value);

                    if (value === "") setInputPage(value);

                    if (
                      isOnlyNumbers &&
                      Number(value) >= 1 &&
                      Number(value) <= pokemons.maxPage + 1
                    )
                      setInputPage(value);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <Button
                  className="px-2"
                  variant="ghost"
                  onClick={() => setPage(pokemons.maxPage)}
                >
                  {pokemons.maxPage + 1}
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  className="px-2"
                  variant="ghost"
                  onClick={() => {
                    if (page < pokemons.maxPage) setPage(page + 1);
                  }}
                >
                  {"Next >"}
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <div className="container flex flex-col items-center justify-center h-full gap-4 text-center">
          <p className="text-4xl font-bold">
            There was an error fetching pokemons
          </p>
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
          <Button onClick={() => refetch()}>Try again</Button>
        </div>
      )}
    </div>
  );
}

