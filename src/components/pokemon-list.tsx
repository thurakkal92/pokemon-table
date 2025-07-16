"use client";

import { usePokemonList } from "@/hooks/use-pokemon";
import { Eye, Search } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pokemon } from "@/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

import { usePagination } from "@/hooks/use-pagination";
import { Pagination } from "@/components/pagination";
import { formatPokemonName } from "@/lib/utils";
import { PokemonDialog } from "./pokemon-dialog";
import PokemonListLoading from "./pokemon-list-loading";

interface PokemonListProps {
  page: number;
  limit: number;
}

export default function PokemonList({ page, limit }: PokemonListProps) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchValue, setSearchValue] = useState(initialSearch);

  const {
    currentPage = page,
    itemsPerPage = limit,
    handlePageChange,
    handleItemsPerPageChange,
  } = usePagination(20);

  const { data, isLoading, error } = usePokemonList({
    page: currentPage,
    limit: itemsPerPage,
    searchValue: searchValue,
  });

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const totalItems = data?.count || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const inputValue = searchInputRef.current?.value || "";
    setSearchValue(inputValue);

    const newSearchParams = new URLSearchParams(searchParams);
    if (inputValue.trim()) {
      newSearchParams.set("search", inputValue.toLowerCase());
      newSearchParams.delete("page"); // Reset pagination on search
    } else {
      newSearchParams.delete("search");
    }
    router.push(`/?${newSearchParams.toString()}`);
  };

  const clearSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    setSearchValue("");
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("search");
    newSearchParams.delete("page"); // Reset pagination
    router.push(`/?${newSearchParams.toString()}`);
  };

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500 mb-4">
          Error loading Pokemon: {error.message}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  function getTotalStats(pokemon: Pokemon): number {
    return pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Pokemon List</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Explore and search through the Pokémon database
      </p>
      <form
        onSubmit={handleSearch}
        className="mb-6 flex items-center gap-2 w-full"
      >
        <div className="relative w-[calc(50%-95px)]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            required
            defaultValue={initialSearch}
            type="text"
            id="search"
            placeholder="Search Pokémon by name..."
            ref={searchInputRef}
            className="pl-10 pr-20 h-10 w-[100%] border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            Clear
          </Button>
        </div>
        <Button
          size="lg"
          variant="default"
          type="submit"
          className="h-10 cursor-pointer"
        >
          Search
        </Button>
      </form>
      {isLoading ? (
        <PokemonListLoading />
      ) : (
        <div className="grid gap-4 pb-4 border rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="w-20"></TableHead>
                <TableHead className="text-left">Name</TableHead>
                <TableHead className="text-left">Types</TableHead>
                <TableHead className="text-left">Height</TableHead>
                <TableHead className="text-left">Weight</TableHead>
                <TableHead className="text-left">Base XP</TableHead>
                <TableHead className="text-left">Total Stats</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.results && data.results.length > 0 ? (
                data.results.map((item: Pokemon, idx: number) => (
                  <TableRow
                    className="cursor-pointer"
                    key={idx}
                    onClick={() => setSelectedPokemon(item)}
                  >
                    <TableCell className="flex items-center space-x-2">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                        <Image
                          src={
                            item.sprites.front_default ||
                            "/placeholder.svg?height=48&width=48"
                          }
                          alt={item.name}
                          fill
                          className="object-contain hover:scale-110 transition-transform duration-200"
                          sizes="32px"
                        />
                      </div>
                    </TableCell>

                    <TableCell className="font-medium cursor-pointer ">
                      <div className="font-medium capitalize">
                        {formatPokemonName(item.name)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        #{item.id.toString().padStart(3, "0")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {item.types.map((type) => (
                          <Badge
                            key={type.type.name}
                            className="rouded-full"
                            variant="outline"
                          >
                            {type.type.name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{item.height}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>{item.base_experience}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium">
                          {getTotalStats(item)}
                        </span>
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min(
                                (getTotalStats(item) / 800) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="p-2 text-center">
                      <Button
                        className="cursor-pointer"
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedPokemon(item)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No Pokémon found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedPokemon && (
        <PokemonDialog
          pokemonName={selectedPokemon?.name || ""}
          isOpen={selectedPokemon !== null}
          onClose={() => setSelectedPokemon(null)}
        />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        className="mt-4"
      />
    </div>
  );
}
