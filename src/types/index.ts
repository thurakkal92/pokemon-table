export interface PokemonSprites {
  front_default: string | null;
  other: {
    "official-artwork": {
      front_default: string | null;
    };
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: boolean;
  types: PokemonType[];
  sprites: PokemonSprites;
  stats: PokemonStat[];
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

export interface EvolutionTriggerResult {
  name: string;
  url: string;
}

export interface EvolutionTrigger {
  id: number;
  name: string;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  pokemon_species: {
    name: string;
    url: string;
  }[];
}

export interface EvolutionTriggersListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: EvolutionTriggerResult[];
}

export interface GetEvolutionTriggersResponse {
  results: EvolutionTrigger[];
  count: number;
  next: string | null;
  previous: string | null;
}
