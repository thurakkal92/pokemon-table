import { AlertCircle, Loader2, Shuffle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEvolutionTriggers } from "@/hooks/use-pokemon";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pagination } from "@/components/pagination";
import { usePagination } from "@/hooks/use-pagination";

function EvolutionTriggerTable() {
  const {
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
  } = usePagination(10);

  const {
    data: evolutionData,
    isLoading: evolutionLoading,
    isError: evolutionError,
  } = useEvolutionTriggers({ page: currentPage, limit: itemsPerPage });

  const totalItems = evolutionData?.count || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shuffle className="h-5 w-5" />
          Evolution Triggers
        </CardTitle>
        <CardDescription>
          Comprehensive table of Pokémon evolution methods and requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        {evolutionLoading ? (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
            <p className="text-slate-500">Loading evolution triggers...</p>
          </div>
        ) : evolutionError ? (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Failed to load evolution triggers. Please try again.
            </AlertDescription>
          </Alert>
        ) : evolutionData ? (
          <>
            {/* Evolution Triggers Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted">
                    <TableHead className="text-center">ID</TableHead>
                    <TableHead>Trigger</TableHead>
                    <TableHead className="min-w-[150px] text-center">
                      Species
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evolutionData.results.map((trigger) => (
                    <TableRow
                      key={trigger.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      {/* ID Column */}
                      <TableCell className="font-mono text-center text-sm font-medium">
                        {trigger.id}
                      </TableCell>

                      {/* Evolution Method Column */}
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-semibold capitalize text-slate-900">
                            {trigger.name.replace("-", " ")}
                          </div>
                          <div className="text-xs text-slate-500 font-mono">
                            {trigger.name}
                          </div>
                        </div>
                      </TableCell>

                      {/* Species Count Column */}
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className="text-lg font-bold text-primary">
                            {trigger?.pokemon_species?.length}
                          </div>
                          <div className="text-xs text-slate-500">species</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              className="mt-4"
            />
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default EvolutionTriggerTable;
