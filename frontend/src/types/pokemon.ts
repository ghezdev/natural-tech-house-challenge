import { TYPES_POKEMON } from "../lib/const";

export type TPokemonList = {
  totalPokemons: number;
  maxPage: number;
  page: number;
  pokemons: TPokemon[];
};

export type TDetailPokemon = TPokemon & {
  abilities: TAbility[];
  baseExperience: number;
  height: number;
  weight: number;
};

export type TPokemon = {
  name: string;
  image: string;
  types: TTypesPokemon[];
  stats: TStatPokemon[];
};

type TStatPokemon = {
  effort: number;
  baseStat: number;
  typeStat:
    | "hp"
    | "attack"
    | "defense"
    | "special-attack"
    | "special-defense"
    | "speed";
};

type TAbility = {
  name: string;
  description: string | undefined;
};

export type TTypesPokemon = (typeof TYPES_POKEMON)[number];

