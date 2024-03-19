import express from "express";
import pokemonController from "../controllers/pokemon.controller";

export const routerPokemon = express.Router();

/**
 * @openapi
 * /api/pokemon:
 *  get:
 *      tags:
 *      - Pokemon
 *      summary: Get all pokemons. Query by name or type
 *      parameters:
 *        - name: name
 *          in: query
 *          description: Name of the pokemon
 *        - name: type
 *          in: query
 *          description: Type of the pokemon
 *      responses:
 *        200:
 *          description: List of pokemons
 *          content:
 *            application/json:
 *              example:
 *                totalPokemons: 1302
 *                maxPage: 130
 *                page: 0
 *                limit: 10
 *                pokemons:
 *                  - name: bulbasaur
 *                    image: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
 *                    types:
 *                      - grass
 *                      - poison
 *                    stats:
 *                      - effort: 0
 *                        baseStat: 45
 *                        typeStat: "hp"
 *                      - effort: 0
 *                        baseStat: 49
 *                        typeStat: attack
 *                      - effort: 0
 *                        baseStat: 49
 *                        typeStat: defense
 *                      - effort: 1
 *                        baseStat: 65
 *                        typeStat: special-attack
 *                      - effort: 0
 *                        baseStat: 65
 *                        typeStat: special-defense
 *                      - effort: 0
 *                        baseStat: 45
 *                        typeStat: speed
 *
 */
routerPokemon.get("/", pokemonController.getAllPokemon);

/**
 * @openapi
 * /api/pokemon/:name:
 *  get:
 *      tags:
 *      - Pokemon
 *      summary: Get a single pokemon by name of pokemon
 *      parameters:
 *        - name: name
 *          in: path
 *          description: Name of the pokemon
 *          required: true
 *      responses:
 *        200:
 *          description: Pokemon found
 *          content:
 *            application/json:
 *              example:
 *                name: "charmander"
 *                image: ""
 *                types:
 *                - fire
 *                stats:
 *                -
 *                  effort: 40
 *                  baseStat: 30
 *                  typeStat: hp
 *                abilities:
 *                -
 *                  name: Fireball
 *                  description: Fireball
 *                baseExperience: 100
 *                height: 80
 *                weight: 80
 *
 *        404:
 *           description: Not found
 */
routerPokemon.get("/:name", pokemonController.getPokemonByName);

