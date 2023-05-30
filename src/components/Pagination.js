import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, pageRangeDisplayed }) => {

  // isFirstPage & isLastPage are flags used to manage the enabling/disabling of prev and next button.
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  
  const visiblePages = [];

  // Generate visible pages based on current page and total pages
  if (totalPages <= pageRangeDisplayed) {
    // If total pages are less than or equal to the pageRangeDisplayed, display all pages
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
  } else {
    // If total pages are more than the pageRangeDisplayed, display specific range of pages
    const leftOffset = Math.floor(pageRangeDisplayed / 2);
    const rightOffset = pageRangeDisplayed - leftOffset - 1;
    let startPage = currentPage - leftOffset;
    let endPage = currentPage + rightOffset;

    if (startPage < 1) {
      startPage = 1;
      endPage = pageRangeDisplayed;
    } else if (endPage > totalPages) {
      startPage = totalPages - pageRangeDisplayed + 1;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
  }

  return (
    <div className="mt-2 pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className={`mx-1 py-1 px-2 rounded ${
          1 === currentPage
            ? "bg-gray-300 text-gray-700"
            : "bg-blue-500 text-white"
        }`}
        disabled={isFirstPage}
      >
        {"<< Prev"}
      </button>

      {visiblePages[0] !== 1 && (
        <button
          onClick={() => onPageChange(1)}
          className={`mx-1 py-1 px-2 rounded ${
            1 === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          1
        </button>
      )}
      {visiblePages[0] > 2 && <span className="mx-1">...</span>}
      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`mx-1 py-1 px-2 rounded ${
            pageNumber === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
        <span className="mx-1">...</span>
      )}
      {visiblePages[visiblePages.length - 1] !== totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={`mx-1 py-1 px-2 rounded ${
            totalPages === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {totalPages}
        </button>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className={`mx-1 py-1 px-2 rounded ${
          totalPages === currentPage
            ? "bg-gray-300 text-gray-700"
            : "bg-blue-500 text-white"
        }`}
        disabled={isLastPage}
      >
        Next {">>"}
      </button>
    </div>
  );
};

export default Pagination;
