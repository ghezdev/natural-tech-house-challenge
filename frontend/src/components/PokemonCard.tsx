import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { TPokemon } from "../types/pokemon";
import Image from "next/image";
import { ICONS_STAT, getColorByType } from "../lib/const";
import Link from "next/link";

type Props = {
  pokemon: TPokemon;
};

function PokemonCard({ pokemon }: Props) {
  return (
    <Link href={`/ssr/${pokemon.name}`}>
      <Card className="hover:scale-105 transition-all">
        <CardHeader>
          <Image
            src={
              pokemon.image ||
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            }
            className={`mx-auto ${
              pokemon.image === null && "brightness-0 dark:invert"
            }`}
            width={100}
            height={100}
            alt={`${pokemon.name} image`}
            priority
          />
        </CardHeader>
        <CardContent>
          <p className="text-center uppercase font-semibold text-xl truncate mb-2">
            {pokemon.name}
          </p>
          <div className="flex flex-col xs:flex-row gap-2 justify-center items-center">
            {pokemon.types.map((type) => (
              <Badge
                key={`${pokemon.name}-${type}`}
                className="w-fit"
                pokemon={type}
              >
                {type}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-0 gap-y-2 sm:gap-y-4">
          {pokemon.stats.map(({ baseStat, typeStat }) => (
            <div
              key={`${pokemon.name}-${typeStat}`}
              className="flex gap-2 items-center justify-center"
            >
              <Image
                src={ICONS_STAT[typeStat as keyof typeof ICONS_STAT]}
                alt={`${typeStat} ${pokemon.name}`}
                width={20}
                height={20}
              />
              <p>{baseStat}</p>
            </div>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}

export default PokemonCard;

