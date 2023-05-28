import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [filteredRows, setFilteredRows] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [showdownSortIcon, setShowDownSortIcon] = useState(false);
  const [sortDirection, setSortDirection] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [rows, setRows] = useState([]); // Initialize rows with an empty array

  const updateRows = (newRows) => {
    setRows(newRows);
  };

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

  const contextValue = {
    filteredRows,
    sortColumn,
    showdownSortIcon,
    sortDirection,
    globalSearch,
    currentPage,
    handleSort,
    handleFilter,
    handleGlobalSearch,
    handlePageChange,
    setFilteredRows,
    updateRows,
    rows,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
