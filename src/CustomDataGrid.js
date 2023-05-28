import React, { useEffect, useState, useContext } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import Pagination from "./Pagination";
import { AppContext } from "./providers/AppProvider";

const CustomDataGrid = ({
  columns,
  rows,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  totalPages,
}) => {
  const [filteredRows, setFilteredRows] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [showdownSortIcon, setShowDownSortIcon] = useState(false);
  const [sortDirection, setSortDirection] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  const handleSort = (column) => {
    let direction = "asc";

    if (sortColumn === column && sortDirection === "asc") {
      direction = "desc";
    }

    setSortColumn(column);
    setSortDirection(direction);
    setShowDownSortIcon(!showdownSortIcon);

    const sortedRows = [...filteredRows].sort((a, b) => {
      if (direction === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });

    setFilteredRows(sortedRows);
  };

  const handleFilter = (event, column) => {
    const value = event.target.value.toLowerCase();
    let filteredData = [...rows];

    if (value) {
      filteredData = filteredData?.filter((row) => {
        return row[column]?.toString().toLowerCase().includes(value);
      });
    }

    setFilteredRows(filteredData);
    setCurrentPage(1); // Reset current page when filtering applied
  };

  const handleGlobalSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setGlobalSearch(value);

    let filteredData = [...rows];

    if (value) {
      filteredData = filteredData.filter((row) => {
        return Object.values(row).some((cell) => {
          return cell?.toString().toLowerCase().includes(value);
        });
      });
    }

    setFilteredRows(filteredData);
    setCurrentPage(1); // Reset current page when global search applied
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderTableRows = () => {
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;

    // return filteredRows?.slice(startIndex, endIndex).map((row) => (
    //   <tr key={row.id}>
    //     {columns.map((column) => (
    //       <td key={column.field} id={column.field}>{row[column?.field]}</td>
    //     ))}
    //   </tr>
    // ));

    // return filteredRows?.slice(startIndex, endIndex).map((row) => (
    //   <tr key={row.id}>
    //     {columns.map((column) => {
    //       let value;
    //       if (column.valueGetter) {
    //         value = column.valueGetter({ row }); // Use custom valueGetter if available to get our data in a suitable format
    //       } else {
    //         const fieldKeys = column.field.split("."); // Split the field into nested keys
    //         value = fieldKeys.reduce((obj, key) => obj?.[key], row); // Access nested properties
    //       }
    //       return (
    //         <td key={column.field} id={column.field}>
    //           {value}
    //         </td>
    //       );
    //     })}
    //   </tr>
    // ));

    return filteredRows?.map((row) => (
      <tr key={row.id}>
        {columns.map((column) => {
          let value;
          if (column.valueGetter) {
            value = column.valueGetter({ row }); // Use custom valueGetter if available to get our data in a suitable format
          } else {
            const fieldKeys = column.field.split("."); // Split the field into nested keys
            value = fieldKeys.reduce((obj, key) => obj?.[key], row); // Access nested properties
          }
          return (
            <td key={column.field} id={column.field}>
              {value}
            </td>
          );
        })}
      </tr>
    ));
  };

  // const totalPages = Math.ceil(filteredRows?.length / itemsPerPage);
  // console.log(totalPages, filteredRows.length, itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <input
        type="text"
        placeholder="Global Search"
        value={globalSearch}
        onChange={handleGlobalSearch}
        className="border border-gray-300 rounded px-2 py-1 mb-2"
      />
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              {columns?.map((column) => (
                <th key={column.field} className="cursor-pointer">
                  <span>
                    {" "}
                    {column.headerName}{" "}
                    {showdownSortIcon ? (
                      <AiOutlineArrowDown
                        width={20}
                        color="#000"
                        onClick={() => handleSort(column.field)}
                      />
                    ) : (
                      <AiOutlineArrowUp
                        width={20}
                        color="#000"
                        onClick={() => handleSort(column.field)}
                      />
                    )}
                  </span>
                  <input
                    type="text"
                    placeholder="Filter"
                    onChange={(event) => handleFilter(event, column.field)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 text-sm"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>

      {/* <div className="mt-2">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`mx-1 py-1 px-2 rounded ${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div> */}

      {/* <div className="mt-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isFirstPage}
          className="mx-1 py-1 px-2 rounded bg-gray-300 text-gray-700"
        >
          Prev
        </button>
        {visiblePages.map((pageNumber, index) => {
          if (pageNumber === "dot") {
            return (
              <span key={`dot-${index}`} className="mx-1">
                ...
              </span>
            );
          }

          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 py-1 px-2 rounded ${
                pageNumber === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLastPage}
          className="mx-1 py-1 px-2 rounded bg-gray-300 text-gray-700"
        >
          Next
        </button>
      </div> */}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CustomDataGrid;
