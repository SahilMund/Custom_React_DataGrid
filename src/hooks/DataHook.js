import { useContext, useState } from "react";

import { DataContext } from "../providers/DataProvider";
import axios from "axios";

// Using useContext hooks, creating a custom hook "usePosts" to enable other components to able to access data from the context
export const useData = () => {
  return useContext(DataContext);
};

// Creating a custom hook to implement CRUD functionality
export const useProvideData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(0);

  const BASE_URI = "https://jsonplaceholder.typicode.com";

  const storeDataToLocalStorage = (key, val) => {
    return localStorage.setItem(key, JSON.stringify(val));
  };

  const fetchData = async (type) => {
    try {
      const startInd = (currentPage - 1) * itemsPerPage;
      const response = await axios.get(
        `${BASE_URI}/${type}?_start=${startInd}&_limit=${itemsPerPage}`
      );

      const allResponse = await axios.get(`${BASE_URI}/${type}`);

      setData(response.data);
      storeDataToLocalStorage(type, response.data);

      setTotalPages(Math.ceil(allResponse.data.length / itemsPerPage));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    data,
    fetchData,
    setCurrentPage,
    currentPage,
    totalPages,
    itemsPerPage,
  };
};
