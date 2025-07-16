import {
  EvolutionTrigger,
  EvolutionTriggerResult,
  EvolutionTriggersListResponse,
  Pokemon,
  PokemonListResponse,
  PokemonResult,
} from "@/types";
import { fetcher } from "../fetcher";
import { API_CONFIG, API_ENDPOINTS } from "@/config/pokemon-api";

export const pokemonApi = {
  getAll: async ({
    page = 1,
    limit = 20,
  }: {
    page?: number;
    limit?: number;
  }) => {
    const offset = (page - 1) * limit;

    try {
      const data = await fetcher<PokemonListResponse>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${API_ENDPOINTS.POKEMON.GET_ALL}?limit=${limit}&offset=${offset}`
      );

      console.log("Fetched Pokemon data:", data);
      const detailedResults = await Promise.all(
        data.results.map(async (pokemon: PokemonResult) => {
          try {
            return await fetcher<Pokemon>(pokemon?.url);
          } catch (error) {
            throw new Error(
              `Failed to fetch Pokemon details for ${pokemon.name}: ${error}`
            );
          }
        })
      );

      return {
        results: detailedResults,
        count: data.count,
        next: data.next,
        previous: data.previous,
      };
    } catch (error) {
      throw new Error(`Failed to fetch Pokemon list: ${error}`);
    }
  },

  getByName: async (name: string) => {
    const queryName = name.toLowerCase();
    try {
      return await fetcher<Pokemon>(
        `${API_CONFIG.BASE_URL}${
          API_CONFIG.API_VERSION
        }${API_ENDPOINTS.POKEMON.GET_BY_NAME(queryName)}`
      );
    } catch (error) {
      throw new Error(`Failed to fetch Pokemon with name ${name}: ${error}`);
    }
  },
  getEvolutionTriggers: async ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) => {
    const offset = (page - 1) * limit;

    try {
      const data = await fetcher<EvolutionTriggersListResponse>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${API_ENDPOINTS.POKEMON.GET_EVOLUTION_TRIGGERS}?limit=${limit}&offset=${offset}`
      );
      const detailedResults = await Promise.all(
        data.results.map(async (trigger: EvolutionTriggerResult) => {
          try {
            return await fetcher<EvolutionTrigger>(trigger?.url);
          } catch (error) {
            throw new Error(
              `Failed to fetch Evolution Trigger details for ${trigger.name}: ${error}`
            );
          }
        })
      );

      return {
        results: detailedResults,
        count: data.count,
        next: data.next,
        previous: data.previous,
      };
    } catch (error) {
      throw new Error(`Failed to fetch Pokemon list: ${error}`);
    }
  },
};
