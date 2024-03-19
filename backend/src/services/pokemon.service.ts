import { AxiosError } from "axios";
import { HttpError } from "../classes/errors/http-error";
import { axiosInstance } from "../config";
import {
  TAbility,
  TPokemon,
  TPokemonList,
  TTypePokemon,
} from "../interfaces/pokemon";

type Props = {
  type: string;
  name: string;
  page: number;
};

const mapPokemon = (pokemon: TPokemon) => ({
  name: pokemon.name,
  image: pokemon.sprites.front_default,
  types: pokemon.types.map(({ type }) => type.name),
  stats: pokemon.stats.map(({ stat: { name }, base_stat, effort }) => ({
    effort,
    baseStat: base_stat,
    typeStat: name,
  })),
});

const LIMIT_POKEMONS = 10;

const getIndexSlice = (page: number | undefined, increment = 0) =>
  ((page || 0) + increment) * LIMIT_POKEMONS;

async function getAllPokemon({ name, type, page }: Partial<Props>) {
  try {
    if (type) {
      const { data: typesPokemon } = await axiosInstance.get<TTypePokemon>(
        `type/${type}`
      );

      if (typesPokemon.pokemon.length === 0)
        throw new HttpError({ message: "Not found pokemons", statusCode: 404 });

      if (name) {
        const pokemonFound = typesPokemon.pokemon.find(
          ({ pokemon }) => pokemon.name === name
        );

        if (!pokemonFound)
          throw new HttpError({
            message: "Not found pokemon",
            statusCode: 404,
          });

        const { data: pokemon } = await axiosInstance.get<TPokemon>(
          `pokemon/${pokemonFound.pokemon.name}`
        );

        return {
          totalPokemons: 1,
          maxPage: 0,
          page: 0,
          pokemons: [mapPokemon(pokemon)],
        };
      }

      const pokemonsToSearch = typesPokemon.pokemon.slice(
        getIndexSlice(page),
        getIndexSlice(page, 1)
      );

      const pokemonsDetailed = await Promise.all(
        pokemonsToSearch.map(({ pokemon: { name } }) =>
          axiosInstance.get<TPokemon>(`pokemon/${name}`)
        )
      );

      return {
        totalPokemons: typesPokemon.pokemon.length,
        maxPage: Math.trunc(typesPokemon.pokemon.length / LIMIT_POKEMONS),
        page: getIndexSlice(0),
        pokemons: pokemonsDetailed.map(({ data: pokemonDetailed }) =>
          mapPokemon(pokemonDetailed)
        ),
      };
    }

    if (name) {
      const { data: pokemon } = await axiosInstance.get<TPokemon>(
        `pokemon/${name}`
      );

      return {
        totalPokemons: 1,
        maxPage: 0,
        page: 0,
        pokemons: [mapPokemon(pokemon)],
      };
    }

    const { data: pokemons } = await axiosInstance.get<TPokemonList>(
      "pokemon",
      {
        params: { offset: getIndexSlice(page), limit: LIMIT_POKEMONS },
      }
    );

    if (pokemons.results.length === 0)
      throw new HttpError({ message: "Not found pokemons", statusCode: 404 });

    const pokemonsDetailed = await Promise.all(
      pokemons.results.map(({ name }) =>
        axiosInstance.get<TPokemon>(`pokemon/${name}`)
      )
    );

    return {
      totalPokemons: pokemons.count,
      maxPage: Math.trunc(pokemons.count / LIMIT_POKEMONS),
      page: page || 0,
      limit: LIMIT_POKEMONS,
      pokemons: pokemonsDetailed.map(({ data: pokemonDetailed }) =>
        mapPokemon(pokemonDetailed)
      ),
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new HttpError({
          message: "Pokemon not found",
          statusCode: 404,
          error: error.response.data,
        });
      }

      throw new HttpError({
        message: error.response?.statusText || "Error with external api",
        statusCode: error.response?.status,
        error: error.response?.data,
      });
    }

    throw error;
  }
}

async function getPokemonByName(name: string) {
  try {
    const { data: pokemon } = await axiosInstance.get<TPokemon>(
      `pokemon/${name}`
    );

    const abilitiesDetailed = await Promise.all(
      pokemon.abilities.map(({ ability: { name } }) =>
        axiosInstance.get<TAbility>(`ability/${name}`)
      )
    );

    return {
      ...mapPokemon(pokemon),
      abilities: abilitiesDetailed.map(
        ({ data: { name, effect_entries } }) => ({
          name,
          description: effect_entries.find(
            ({ language }) => language.name === "en"
          )?.effect,
        })
      ),
      baseExperience: pokemon.base_experience,
      height: pokemon.height,
      weight: pokemon.weight,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new HttpError({
          message: "Pokemon not found",
          statusCode: 404,
          error: error.response.data,
        });
      }
    }

    throw new HttpError({ message: "Internal server error" });
  }
}

export default {
  getAllPokemon,
  getPokemonByName,
};

