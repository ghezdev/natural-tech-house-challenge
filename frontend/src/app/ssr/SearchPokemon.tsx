"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";

type Props = {};

const NAME_PARAM = "name";

export default function SearchPokemon({}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchParam = searchParams.get(NAME_PARAM)?.toString();

  const handleSearch = useDebounceCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(NAME_PARAM, term);
    } else {
      params.delete(NAME_PARAM);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <Label htmlFor="pokemon-search">Buscar por nombre</Label>
      <Input
        className="w-full md:w-80"
        type="text"
        name="pokemon-search"
        placeholder="Escribe el nombre de un pokemon"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParam}
      />
    </div>
  );
}

