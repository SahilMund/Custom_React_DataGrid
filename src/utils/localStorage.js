//   To Store the data to localStorage
export const storeDataToLocalStorage = (key, val) => {
  return localStorage.setItem(key, JSON.stringify(val));
};


  // function to get the data from localStorage
export  const getLocalStorageData = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };