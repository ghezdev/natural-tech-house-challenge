import React from "react";
import { arrayRange } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export default function GridPokemonSkeleton({}: Props) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 my-8 gap-8"
      data-testid="grid-pokemons"
    >
      {arrayRange(0, 10).map((pokemon) => (
        <Card
          key={`skeleton-card-${pokemon}`}
          className="hover:scale-105 transition-all"
        >
          <CardHeader>
            <Skeleton className="mx-auto w-28 h-28" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Skeleton className="w-40 h-5" />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <Skeleton className="w-10 h-5" />
              <Skeleton className="w-12 h-5" />
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-0 gap-y-2 sm:gap-y-4">
            {arrayRange(1, 6).map((value) => (
              <div
                key={`stat-skeleton-${value}`}
                className="flex gap-2 items-center justify-center"
              >
                <Skeleton className="w-12 h-5" />
              </div>
            ))}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

