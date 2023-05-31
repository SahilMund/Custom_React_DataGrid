import { useContext, useState } from "react";
import axios from "axios";

import { DataContext } from "../providers/DataProvider";
import { getItemURI, getPaginatedItemsURI } from "../services/api";
import { storeDataToLocalStorage } from "../utils/localStorage";

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

  const fetchData = async (type) => {
    try {
      const startInd = (currentPage - 1) * itemsPerPage;
      setIsLoading(true);

      const response = await axios.get(
        getPaginatedItemsURI(type, startInd, itemsPerPage)
      );

      //   Fetching all responses as well, to get the total number of pages that needs to be displayed in pagination
      const allResponse = await axios.get(getItemURI(type));

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
    isLoading,
  };
};
