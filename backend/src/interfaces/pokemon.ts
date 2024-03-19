export type TPokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
};

export interface GetPokemonForm {
  form_name: string;
  form_names: any[];
  form_order: number;
  id: number;
  is_battle_only: boolean;
  is_default: boolean;
  is_mega: boolean;
  name: string;
  names: any[];
  order: number;
  pokemon: Result;
  sprites: Sprites;
  types: Type[];
  version_group: Result;
}

interface Sprites {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}

interface Type {
  slot: number;
  type: Result;
}

interface Result {
  name: string;
  url: string;
}

// ----------------------------------------------------------------

export type TPokemon = {
  abilities: Ability[];
  base_experience: number;
  cries: Cries;
  forms: Form[];
  game_indices: Index[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Mfe[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
};

interface Ability {
  ability: Ability2;
  is_hidden: boolean;
  slot: number;
}

interface Ability2 {
  name: string;
  url: string;
}

interface Cries {
  latest: string;
  legacy: string;
}

interface Form {
  name: string;
  url: string;
}

interface Index {
  game_index: number;
  version: Version;
}

interface Version {
  name: string;
  url: string;
}

interface Mfe {
  move: Move;
  version_group_details: VersionGroupDetail[];
}

interface Move {
  name: string;
  url: string;
}

interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: VersionGroup;
}

interface MoveLearnMethod {
  name: string;
  url: string;
}

interface VersionGroup {
  name: string;
  url: string;
}

interface Species {
  name: string;
  url: string;
}

interface Other {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
  showdown: Showdown;
}

interface DreamWorld {
  front_default: string;
  front_female: any;
}

interface Home {
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}

interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

interface Showdown {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}

interface Versions {
  "generation-i": GenerationI;
  "generation-ii": GenerationIi;
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-v": GenerationV;
  "generation-vi": GenerationVi;
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

interface GenerationI {
  "red-blue": RedBlue;
  yellow: Yellow;
}

interface RedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

interface Yellow {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Silver;
}

interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

interface Silver {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

interface GenerationIii {
  emerald: Emerald;
  "firered-leafgreen": FireredLeafgreen;
  "ruby-sapphire": RubySapphire;
}

interface Emerald {
  front_default: string;
  front_shiny: string;
}

interface FireredLeafgreen {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

interface RubySapphire {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

interface GenerationIv {
  "diamond-pearl": DiamondPearl;
  "heartgold-soulsilver": HeartgoldSoulsilver;
  platinum: Platinum;
}

interface DiamondPearl {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}

interface HeartgoldSoulsilver {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}

interface Platinum {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}

interface GenerationV {
  "black-white": BlackWhite;
}

interface BlackWhite {
  animated: Animated;
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}

interface Animated {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}

interface GenerationVi {
  "omegaruby-alphasapphire": OmegarubyAlphasapphire;
  "x-y": XY;
}

interface OmegarubyAlphasapphire {
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}

interface XY {
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}

interface GenerationVii {
  icons: Icons;
  "ultra-sun-ultra-moon": UltraSunUltraMoon;
}

interface Icons {
  front_default: string;
  front_female: any;
}

interface UltraSunUltraMoon {
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}

interface GenerationViii {
  icons: Icons2;
}

interface Icons2 {
  front_default: string;
  front_female: any;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: Stat2;
}

interface Stat2 {
  name: string;
  url: string;
}

interface Type2 {
  name: string;
  url: string;
}

// type ----------------------------------------------------------------

export interface TTypePokemon {
  damage_relations: DamageRelations;
  game_indices: Index[];
  generation: Generation2;
  id: number;
  move_damage_class: MoveDamageClass;
  moves: Mfe[];
  name: string;
  names: Name[];
  past_damage_relations: PastDamageRelation[];
  pokemon: Pokemon[];
}

interface DamageRelations {
  double_damage_from: DoubleDamageFrom[];
  double_damage_to: DoubleDamageTo[];
  half_damage_from: HalfDamageFrom[];
  half_damage_to: HalfDamageTo[];
  no_damage_from: any[];
  no_damage_to: any[];
}

interface DoubleDamageFrom {
  name: string;
  url: string;
}

interface DoubleDamageTo {
  name: string;
  url: string;
}

interface HalfDamageFrom {
  name: string;
  url: string;
}

interface HalfDamageTo {
  name: string;
  url: string;
}

interface Index {
  game_index: number;
  generation: Generation;
}

interface Generation {
  name: string;
  url: string;
}

interface Generation2 {
  name: string;
  url: string;
}

interface MoveDamageClass {
  name: string;
  url: string;
}

interface Mfe {
  name: string;
  url: string;
}

interface Name {
  language: Language;
  name: string;
}

interface Language {
  name: string;
  url: string;
}

interface PastDamageRelation {
  damage_relations: DamageRelations2;
  generation: Generation3;
}

interface DamageRelations2 {
  double_damage_from: DoubleDamageFrom2[];
  double_damage_to: DoubleDamageTo2[];
  half_damage_from: HalfDamageFrom2[];
  half_damage_to: HalfDamageTo2[];
  no_damage_from: any[];
  no_damage_to: any[];
}

interface DoubleDamageFrom2 {
  name: string;
  url: string;
}

interface DoubleDamageTo2 {
  name: string;
  url: string;
}

interface HalfDamageFrom2 {
  name: string;
  url: string;
}

interface HalfDamageTo2 {
  name: string;
  url: string;
}

interface Generation3 {
  name: string;
  url: string;
}

interface Pokemon {
  pokemon: Pokemon2;
  slot: number;
}

interface Pokemon2 {
  name: string;
  url: string;
}

// ability ----------------------------------------------------------------

export interface TAbility {
  effect_changes: any[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Generation;
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon: Pokemon[];
}

interface EffectEntry {
  effect: string;
  language: Language;
  short_effect: string;
}

interface Language {
  name: string;
  url: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: Language2;
  version_group: VersionGroup;
}

interface Language2 {
  name: string;
  url: string;
}

interface VersionGroup {
  name: string;
  url: string;
}

interface Generation {
  name: string;
  url: string;
}

interface Name {
  language: Language3;
  name: string;
}

interface Language3 {
  name: string;
  url: string;
}

interface Pokemon {
  is_hidden: boolean;
  pokemon: Pokemon2;
  slot: number;
}

interface Pokemon2 {
  name: string;
  url: string;
}

