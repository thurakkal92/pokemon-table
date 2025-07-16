import { pokemonApi } from "@/lib/api/pokemon-api";
import { useQuery } from "@tanstack/react-query";

export function usePokemonList({
  page = 1,
  limit = 20,
  searchValue = "",
}: {
  page?: number;
  limit?: number;
  searchValue?: string;
}) {
  return useQuery({
    queryKey: ["pokemon-list", page, limit, searchValue],
    queryFn: async () => {
      if (searchValue) {
        try {
          const pokemon = await pokemonApi.getByName(searchValue);
          return {
            results: [pokemon],
            count: 1,
            next: null,
            previous: null,
          };
        } catch {
          return {
            results: [],
            count: 0,
            next: null,
            previous: null,
          };
        }
      } else {
        // Fetch paginated list
        return pokemonApi.getAll({ page, limit });
      }
    },
    refetchOnWindowFocus: false,
  });
}

export function usePokemonDetails(name: string) {
  return useQuery({
    queryKey: ["pokemon-details", name],
    queryFn: () => pokemonApi.getByName(name),
    refetchOnWindowFocus: false,
  });
}

export function useEvolutionTriggers({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  return useQuery({
    queryKey: ["pokemon-evolution", page, limit],
    queryFn: () => pokemonApi.getEvolutionTriggers({ page, limit }),
    refetchOnWindowFocus: false,
  });
}
