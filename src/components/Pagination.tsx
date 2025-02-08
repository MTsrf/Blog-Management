"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  pageInfo: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  currentPage: number;
}

export default function Pagination({ pageInfo, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getUpdatedQuery = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    return params.toString();
  };
  return (
    <div className="flex justify-center items-center space-x-2">
      <Link
        href={`${pathname}?${getUpdatedQuery(currentPage - 1)}`}
        className={`px-4 py-2 border rounded ${
          !pageInfo.hasPreviousPage ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        Prev
      </Link>

      {[...Array(pageInfo.totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <Link
            key={pageNumber}
            href={`${pathname}?${getUpdatedQuery(pageNumber)}`}
            className={`px-4 py-2 border rounded ${
              pageNumber === currentPage
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}

      <Link
        href={`${pathname}?${getUpdatedQuery(currentPage + 1)}`}
        className={`px-4 py-2 border rounded ${
          !pageInfo.hasNextPage ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        Next
      </Link>
    </div>
  );
}
