import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const usePagination = (initialItemsPerPage: number = 20) => {
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialLimit = parseInt(
    searchParams.get("limit") || initialItemsPerPage.toString(),
    10
  );

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialLimit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    if (!newItemsPerPage || newItemsPerPage <= 0) return;
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination,
  };
};
