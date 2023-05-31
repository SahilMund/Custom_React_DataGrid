import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { useData } from "../hooks/DataHook";
import Pagination from "./Pagination";
import Loader from "./Loader";

const CustomDataGrid = ({ columns, rows }) => {
  const [filteredRows, setFilteredRows] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [globalSearch, setGlobalSearch] = useState("");

  const context = useData();

  const { setCurrentPage, currentPage, totalPages } = context;

  useEffect(() => {
    setFilteredRows(rows);
    setSortDirection("asc");
  }, [rows]);

  const handleSort = (column) => {
    let direction = "asc";

    if (sortColumn === column && sortDirection === "asc") {
      direction = "desc";
    }

    setSortColumn(column);
    setSortDirection(direction);
    // setShowUpIcon(!showUpIcon);

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
    // setColumnSearch(value);
    let filteredData = [...rows];

    if (value) {
      filteredData = filteredData?.filter((row) => {
        return row[column]?.toString().toLowerCase().includes(value);
      });
    }

    setFilteredRows(filteredData);
    // setCurrentPage(1); // Reset current page when filtering applied
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
    // setCurrentPage(1); // Reset current page when global search applied
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderTableRows = () => {
    if (filteredRows?.length === 0) {
      return (
        <tr>
          <td></td>
          <td> No Data Found for the filtered result !!</td>
          <td></td>
        </tr>
      );
    }

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
            <>
              <td key={column.field} id={column.field}>
                {value}
              </td>
            </>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className="main_wrapper">
      <input
        type="text"
        placeholder="Global Search"
        value={globalSearch}
        onChange={handleGlobalSearch}
        className="border border-gray-300 rounded px-2 py-1 mb-2"
      />

      {context.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="table-wrapper">
            <table className="fl-table">
              <thead className="thead-main">
                <tr>
                  {columns?.map((column) => (
                    <th key={column.field} className="cursor-pointer">
                      <span className="span_headerName">
                        {" "}
                        {column.headerName} &nbsp;
                        
                        {sortDirection === 'desc' ? (
                          <AiOutlineArrowUp
                            width={50}
                            color="#fff"
                            onClick={() => handleSort(column.field)}
                          />
                        ) : (
                          <AiOutlineArrowDown
                            width={50}
                            color="#fff"
                            onClick={() => handleSort(column.field)}
                          />
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <thead>
                <tr>
                  {columns?.map((column) => (
                    <th key={column.field} className="cursor-pointer">
                      <input
                        type="text"
                        placeholder="Filter"
                        onChange={(event) => handleFilter(event, column.field)}
                        className="thead_filter_input border border-gray-300 rounded px-2 py-1 mt-1 text-sm"
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default CustomDataGrid;
