"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const showPageNumbers = totalPages <= 7;
  const pageNumbers: number[] = [];

  if (showPageNumbers) {
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
      pageNumbers.push(pageNumber);
    }
  }

  return (
    <nav aria-label="Product pages" className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      {showPageNumbers ? (
        pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            aria-current={currentPage === pageNumber ? "page" : undefined}
            onClick={() => onPageChange(pageNumber)}
            className={`h-10 min-w-10 rounded-md border px-3 text-sm ${
              currentPage === pageNumber
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 bg-white text-gray-800"
            }`}
          >
            {pageNumber}
          </button>
        ))
      ) : (
        <span className="px-2 text-sm text-gray-700" aria-live="polite">
          {currentPage} / {totalPages}
        </span>
      )}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}