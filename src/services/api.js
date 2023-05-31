

export const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const getPaginatedItemsURI = (type, startInd, itemsPerPage) =>
`${API_BASE_URL}/${type}?_start=${startInd}&_limit=${itemsPerPage}`;

export const getItemURI = (type) =>
  `${API_BASE_URL}/${type}`;
