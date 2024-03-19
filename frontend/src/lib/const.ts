export const TYPES_POKEMON = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
  "unknown",
  "shadow",
] as const;

export const COLORS_TYPE_POKEMON = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
  unknown: "#777",
  shadow: "#777",
};

export const ICONS_STAT = {
  hp: "/hp.png",
  attack: "/attack.png",
  "special-attack": "/special-attack.png",
  defense: "/defense.png",
  "special-defense": "/special-defense.png",
  speed: "/speed.png",
};

export const getColorByType = (type: keyof typeof COLORS_TYPE_POKEMON) =>
  COLORS_TYPE_POKEMON[type] || "[#777]";

