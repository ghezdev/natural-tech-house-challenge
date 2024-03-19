import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
      pokemon: {
        fire: "bg-fire hover:bg-fire/80",
        normal: "bg-normal hover:bg-normal/80",
        water: "bg-water hover:bg-water/80",
        electric: "bg-electric hover:bg-electric/80",
        grass: "bg-grass hover:bg-grass/80",
        ice: "bg-ice hover:bg-ice/80",
        fighting: "bg-fighting hover:bg-fighting/80",
        poison: "bg-poison hover:bg-poison/80",
        ground: "bg-ground hover:bg-ground/80",
        flying: "bg-flying hover:bg-flying/80",
        psychic: "bg-psychic hover:bg-psychic/80",
        bug: "bg-bug hover:bg-bug/80",
        rock: "bg-rock hover:bg-rock/80",
        ghost: "bg-ghost hover:bg-ghost/80",
        dragon: "bg-dragon hover:bg-dragon/80",
        dark: "bg-dark hover:bg-dark/80",
        steel: "bg-steel hover:bg-steel/80",
        fairy: "bg-fairy hover:bg-fairy/80",
        unknown: "bg-unknown hover:bg-unknown/80",
        shadow: "bg-shadow hover:bg-shadow/80",
      },
    },
    defaultVariants: {
      variant: "default",
      pokemon: "normal",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, pokemon, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, pokemon }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

