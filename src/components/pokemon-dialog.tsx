"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Ruler,
  Weight,
  Loader2,
  AlertCircle,
  Sparkles,
  Info,
} from "lucide-react";
import { usePokemonDetails } from "@/hooks/use-pokemon";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatPokemonHeight, formatPokemonWeight } from "@/lib/utils";
import { Progress } from "./ui/progress";
import EvolutionTriggerTable from "./evolution-trigger-table";

interface PokemonDialogProps {
  pokemonName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function PokemonDialog({
  pokemonName,
  isOpen,
  onClose,
}: PokemonDialogProps) {
  const {
    data: pokemonDetail,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
  } = usePokemonDetails(pokemonName);

  const formatStatName = (statName: string): string => {
    const statNames: Record<string, string> = {
      hp: "HP",
      attack: "Attack",
      defense: "Defense",
      "special-attack": "Sp. Attack",
      "special-defense": "Sp. Defense",
      speed: "Speed",
    };
    return statNames[statName] || statName;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold capitalize flex items-center gap-3">
            {isPokemonLoading ? (
              <>
                <div className="w-16 h-16 rounded-xl bg-slate-100 animate-pulse" />
                <Loader2 className="h-6 w-6 animate-spin" />
                Loading...
              </>
            ) : isPokemonError ? (
              <>
                <AlertCircle className="h-6 w-6 text-red-500" />
                Error loading Pokémon
              </>
            ) : pokemonDetail ? (
              <>
                <div className="w-10 h-10 relative rounded-xl overflow-hidden">
                  <Image
                    src={
                      pokemonDetail.sprites.other["official-artwork"]
                        .front_default ||
                      pokemonDetail.sprites.front_default ||
                      "/placeholder.svg?height=64&width=64" ||
                      "/placeholder.svg"
                    }
                    alt={pokemonDetail.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  {pokemonDetail.name}
                  <div className="text-sm font-normal text-muted-foreground">
                    #{pokemonDetail.id.toString().padStart(3, "0")}
                  </div>
                </div>
              </>
            ) : null}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="h-full w-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="evolution">Evolution</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6 mt-0">
            <div className="space-y-4">
              {isPokemonLoading ? (
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl p-4 animate-pulse">
                    <div className="h-6 bg-slate-200 rounded mb-3 w-32"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ) : isPokemonError ? (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Failed to load Pokémon details. Please try again.
                  </AlertDescription>
                </Alert>
              ) : pokemonDetail ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Main Image and Basic Info */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5" />
                          Appearance
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-center">
                          <div className="w-48 h-48 relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 shadow-inner border-4 border-white">
                            <Image
                              src={
                                pokemonDetail.sprites.other["official-artwork"]
                                  .front_default ||
                                pokemonDetail.sprites.front_default ||
                                "/placeholder.svg?height=192&width=192" ||
                                "/placeholder.svg"
                              }
                              alt={pokemonDetail.name}
                              fill
                              className="object-contain p-4 hover:scale-105 transition-transform duration-300 animate-pulse"
                              priority
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <Ruler className="h-4 w-4 text-slate-500" />
                              <span className="text-sm font-medium text-slate-600">
                                Height
                              </span>
                            </div>
                            <span className="text-lg font-bold">
                              {formatPokemonHeight(pokemonDetail.height)}
                            </span>
                          </div>
                          <div className="text-center p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <Weight className="h-4 w-4 text-slate-500" />
                              <span className="text-sm font-medium text-slate-600">
                                Weight
                              </span>
                            </div>
                            <span className="text-lg font-bold">
                              {formatPokemonWeight(pokemonDetail.weight)}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-slate-600">
                            Types
                          </h4>
                          <div className="flex gap-2">
                            {pokemonDetail.types.map((type) => (
                              <Badge key={type.type.name} variant="default">
                                {type.type.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Description and Details */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Info className="h-5 w-5" />
                          Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-slate-600">
                              Base Experience:
                            </span>
                            <p className="font-mono text-lg">
                              {pokemonDetail.base_experience || "—"}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-slate-600">
                              Order:
                            </span>
                            <p className="font-mono text-lg">
                              #{pokemonDetail.order}
                            </p>
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-slate-600 text-sm">
                            Base status:
                          </span>
                          {/* Base Stats */}

                          <div className="space-y-4 pt-2">
                            {pokemonDetail.stats.map((stat) => (
                              <div key={stat.stat.name} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {/* {getStatIcon(stat.stat.name)} */}
                                    <span className="font-medium text-sm">
                                      {formatStatName(stat.stat.name)}
                                    </span>
                                  </div>
                                  <span className="font-mono text-sm font-normal">
                                    {stat.base_stat}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Progress
                                    value={(stat.base_stat / 255) * 100}
                                    className="flex-1 h-2"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : null}
            </div>
          </TabsContent>
          <TabsContent value="evolution" className="space-y-6 mt-0">
            <EvolutionTriggerTable />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
