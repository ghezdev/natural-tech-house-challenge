"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";
import { TYPES_POKEMON } from "../../lib/const";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

export default function TypePokemon({}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const typeParam = searchParams.get("type")?.toString() || undefined;
  console.log(typeParam);

  const handleSelectType = (type: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("type", type);

    replace(`${pathname}?${params.toString()}`);
  };

  const clearSelect = () => {
    const params = new URLSearchParams(searchParams);

    if (params.get("type")) {
      params.delete("type");

      return `${pathname}?${params.toString()}`;
    }

    return pathname;
  };

  return (
    <div>
      <Label htmlFor="pokemon-type-search">Buscar por tipo</Label>
      <Select
        key={`select-${typeParam}`}
        name="pokemon-type-search"
        onValueChange={(value) => handleSelectType(value)}
        defaultValue={typeParam}
      >
        <SelectTrigger className="w-full md:w-60">
          <SelectValue placeholder="Selecciona un tipo" />
        </SelectTrigger>
        <SelectContent>
          <>
            <Link href={clearSelect()}>
              <Button className="w-full" variant="ghost">
                Clear selection
              </Button>
            </Link>
            <Separator className="my-2" />
            {TYPES_POKEMON.map((type) => (
              <SelectItem key={`select-${type}`} value={type}>
                <Badge className="w-fit" pokemon={type}>
                  {type}
                </Badge>
              </SelectItem>
            ))}
          </>
        </SelectContent>
      </Select>
    </div>
  );
}

