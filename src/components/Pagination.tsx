import { ChangeEvent, useState } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(e.target.value);
    setPageSize(newPageSize);
    setCurrentPage(1);
    onItemsPerPageChange(newPageSize);
  };

  const renderPageNumbers = () => {
    const pageNumbers: JSX.Element[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          aria-label={`Page ${i}`}
          aria-current={currentPage === i ? "page" : undefined}>
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 bg-white p-4 rounded-lg">
      <div className="flex items-center flex-wrap">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-2 mx-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to first page">
          <FaAngleDoubleLeft />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 mx-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to previous page">
          <FaChevronLeft />
        </button>
        <div className="flex items-center flex-wrap">{renderPageNumbers()}</div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 mx-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to next page">
          <FaChevronRight />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 mx-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to last page">
          <FaAngleDoubleRight />
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <select
          value={pageSize}
          onChange={handleItemsPerPageChange}
          className="px-3 py-2 mx-1 rounded-md bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Select items per page">
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">100 per page</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
