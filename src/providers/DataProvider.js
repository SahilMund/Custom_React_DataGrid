import { createContext } from "react";
import { useProvideData } from "../hooks/DataHook";

// initializing some states for our context
const initialState = {
  data: [],
  fetchData: () => {},
  setCurrentPage: () => {},
  currentPage: null,
  totalPages: null,
  itemsPerPage: null,
  setIsLoading :  () => {},
  isLoading : false,

};

// Creating a data context to avoid prop Drilling
export const DataContext = createContext(initialState);

// Creating a DataProvider component which will provide the context to it's child
export const DataProvider = ({ children }) => {
  const data = useProvideData();

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
