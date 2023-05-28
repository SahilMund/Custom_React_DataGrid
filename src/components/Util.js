// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import CustomDataGrid from "../CustomDataGrid";

// const Util = ({ type, columns }) => {
//   const [data, setData] = useState([]);
//   const [headers, setHeaders] = useState([]);
//   const BASE_URI = "https://jsonplaceholder.typicode.com";

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${BASE_URI}/${type}`);
//       setData(response.data);
//       // setHeaders(columns);

//       // console.log(data,headers);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [type]);

//   // return <DataGrid data={data} headers={headers} />;
//   return <CustomDataGrid columns={columns} rows={data} />;
// };

// export default Util;
