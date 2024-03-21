import { Suspense } from "react";
import { TTypesPokemon } from "@/types/pokemon";
import SearchPokemon from "./SearchPokemon";
import GridPokemon from "./GridPokemon";
import TypePokemon from "./TypePokemon";
import GridPokemonSkeleton from "./GridPokemonSkeleton";

type Props = {
  searchParams?: {
    name?: string;
    page?: string;
    type?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const nameParam = searchParams?.name || "";
  const pageParam = Number(searchParams?.page) || 0;
  const typeParam = (searchParams?.type as TTypesPokemon) || undefined;

  return (
    <div className="container pt-20 h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 h-fit">
        <SearchPokemon />
        <TypePokemon />
      </div>
      <Suspense
        key={nameParam + pageParam + typeParam}
        fallback={<GridPokemonSkeleton />}
      >
        <GridPokemon name={nameParam} page={pageParam} type={typeParam} />
      </Suspense>
    </div>
  );
}

