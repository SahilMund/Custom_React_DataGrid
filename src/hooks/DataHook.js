import { useContext, useState } from "react";

import { DataContext } from "../providers/DataProvider";
import axios from "axios";

// Using useContext hooks, creating a custom hook "useData" to enable other components to able to access data from the context
export const useData = () => {
  return useContext(DataContext);
};

// Creating a custom hook
export const useProvideData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  //   Currently setting the limit to 5 per pages.
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(0);

  const BASE_URI = "https://jsonplaceholder.typicode.com";

  //   To Store the data to localStorage
  const storeDataToLocalStorage = (key, val) => {
    return localStorage.setItem(key, JSON.stringify(val));
  };

  const fetchData = async (type) => {
    try {
      const startInd = (currentPage - 1) * itemsPerPage;
      setIsLoading(true);

      const response = await axios.get(
        `${BASE_URI}/${type}?_start=${startInd}&_limit=${itemsPerPage}`
      );

      //   Fetching all responses as well, to get the total number of pages that needs to be displayed in pagination
      const allResponse = await axios.get(`${BASE_URI}/${type}`);

      setData(response.data);
      //   store data to localStorage
      storeDataToLocalStorage(type, response.data);

      setTotalPages(Math.ceil(allResponse.data.length / itemsPerPage));
      setIsLoading(false);

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
    setIsLoading,
    isLoading
  };
};
