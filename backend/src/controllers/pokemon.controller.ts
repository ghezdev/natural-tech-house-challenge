import { Request, Response } from "express";
import pokemonService from "../services/pokemon.service";

async function getAllPokemon(req: Request, res: Response) {
  const { type, name, page } = req.query;

  const pokemons = await pokemonService.getAllPokemon({
    name,
    type,
    page: Number(page),
  } as Partial<{
    name: string;
    type: string;
    page: number;
  }>);

  if (pokemons?.pokemons.length === 0) {
    res.status(204).send([]);
  }

  res.status(200).send(pokemons);
}

async function getPokemonByName(req: Request, res: Response) {
  const { name } = req.params;
  const pokemon = await pokemonService.getPokemonByName(name);
  res.status(200).send(pokemon);
}

export default {
  getAllPokemon,
  getPokemonByName,
};

