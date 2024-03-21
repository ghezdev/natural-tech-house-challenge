import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { arrayRange } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="container pt-20 h-full flex flex-col">
      <Skeleton className="mx-auto w-28 h-28" />

      <div className="flex justify-center mt-4">
        <Skeleton className="w-40 h-5" />
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Skeleton className="w-10 h-5" />
        <Skeleton className="w-12 h-5" />
      </div>
      <div className="flex flex-col sm:flex-row gap-6 text-center mt-4 mx-auto">
        {arrayRange(0, 2).map((value) => (
          <div
            key={`stat-skeleton-${value}`}
            className="flex gap-2 items-center justify-center"
          >
            <Skeleton className="w-12 h-5" />
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-20 gap-y-2 sm:gap-y-4 mx-auto">
        {arrayRange(3, 8).map((value) => (
          <div
            key={`stat-skeleton-${value}`}
            className="flex gap-2 items-center justify-center"
          >
            <Skeleton className="w-12 h-5" />
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <p className="font-bold text-lg mb-2 text-center">ABILITIES</p>
      <div className="flex flex-col gap-4 items-center">
        <Skeleton className="w-24 h-5" />
        <Skeleton className="w-1/2 h-20" />
      </div>
    </div>
  );
}

