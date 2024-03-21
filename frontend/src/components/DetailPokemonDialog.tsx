"use client";
import React from "react";
import { DialogContent, DialogHeader } from "./ui/dialog";
import { useGetPokemonByNameQuery } from "../lib/features/pokemon/pokemonSlice";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useMediaQuery } from "usehooks-ts";
import { DrawerContent, DrawerHeader } from "./ui/drawer";
import { ICONS_STAT } from "../lib/const";

type Props = {
  pokemonName: string;
};

function DetailPokemonDialog({ pokemonName }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const {
    data: pokemon,
    isLoading,
    isError,
    isSuccess,
  } = useGetPokemonByNameQuery(pokemonName, {});

  if (isLoading)
    return (
      <div className="flex flex-grow justify-center items-center">
        <Image
          className="animate-spin"
          src={"pokeball.svg"}
          alt="pokeball loader"
          width={100}
          height={100}
        />
      </div>
    );

  if (isSuccess) {
    if (isDesktop) {
      return (
        <DialogContent>
          <DialogHeader>
            <div>
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
              <div className="grid grid-cols-1 sm:grid-cols-3 items-end text-center mt-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-0 gap-y-2 sm:gap-y-4 items-end text-center">
                {pokemon.stats.map(({ baseStat, effort, typeStat }) => (
                  <div key={`${pokemon.name}-${typeStat}`} className="relative">
                    <Image
                      className="absolute mt-3"
                      src={ICONS_STAT[typeStat as keyof typeof ICONS_STAT]}
                      alt={`${typeStat} ${pokemon.name}`}
                      width={20}
                      height={20}
                    />
                    <p className="font-bold capitalize">
                      {typeStat.replaceAll("-", " ")}
                    </p>
                    <p>{baseStat || "-"}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <p className="font-bold text-lg mb-2">ABILITIES</p>
              <div className="flex flex-col gap-4">
                {pokemon.abilities.map((ability) => (
                  <div key={`${pokemon.name}-${ability.name}`}>
                    <p className="capitalize font-bold">
                      {ability.name || "-"}
                    </p>
                    <p>{ability.description || "-"}</p>
                  </div>
                ))}
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      );
    }

    return (
      <DrawerContent>
        <DrawerHeader className="text-left max-h-[600px] overflow-y-scroll">
          <div>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 items-end text-center mt-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-0 gap-y-2 sm:gap-y-4 items-end text-center">
              {pokemon.stats.map(({ baseStat, effort, typeStat }) => (
                <div key={`${pokemon.name}-${typeStat}`} className="relative">
                  <Image
                    className="absolute left-0 right-40 mx-auto mt-3"
                    src={ICONS_STAT[typeStat as keyof typeof ICONS_STAT]}
                    alt={`${typeStat} ${pokemon.name}`}
                    width={20}
                    height={20}
                  />
                  <p className="font-bold capitalize">
                    {typeStat.replaceAll("-", " ")}
                  </p>
                  <p>{baseStat || "-"}</p>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <p className="font-bold text-lg mb-2">ABILITIES</p>
            <div className="flex flex-col gap-4">
              {pokemon.abilities.map((ability) => (
                <div key={`${pokemon.name}-${ability.name}`}>
                  <p className="capitalize font-bold">{ability.name || "-"}</p>
                  <p>{ability.description || "-"}</p>
                </div>
              ))}
            </div>
          </div>
        </DrawerHeader>
      </DrawerContent>
    );
  }
}

export default DetailPokemonDialog;

