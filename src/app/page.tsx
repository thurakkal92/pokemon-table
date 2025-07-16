import { pokemonApi } from "@/lib/api/pokemon-api";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PokemonList from "@/components/pokemon-list";
import PokemonListLoading from "@/components/pokemon-list-loading";
import { Suspense } from "react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

type PageProps = {
  searchParams: Promise<{ search?: string; page?: string; limit?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const queryClient = getQueryClient();

  const resolvedSearchParams = await searchParams;

  const searchTerm = resolvedSearchParams.search?.toLowerCase() || "";
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const limit = parseInt(resolvedSearchParams.limit || "20", 10);
  try {
    // Prefetch users data on server
    await queryClient.prefetchQuery({
      queryKey: ["pokemon-list", page, limit, searchTerm],
      queryFn: async () => {
        if (searchTerm) {
          try {
            const pokemon = await pokemonApi.getByName(searchTerm);
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
          return pokemonApi.getAll({
            page,
            limit,
          });
        }
      },
    });

    // Pre-fetch evolution triggers for the modal
    await queryClient.prefetchQuery({
      queryKey: ["pokemon-evolution", page, limit],
      queryFn: () => pokemonApi.getEvolutionTriggers({ page, limit }),
    });
  } catch (error) {
    console.error("Server-side prefetch error:", error);
    // Continue rendering even if prefetch fails
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Pokémon Table
            </h1>
            <p className="text-slate-600">
              A table displaying a list of Pokémon with their details.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <Suspense fallback={<PokemonListLoading />}>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <PokemonList page={1} limit={20} />
              </HydrationBoundary>
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const dynamic = "force-dynamic";
