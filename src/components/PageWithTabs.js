// import React, { useState } from "react";
// import CustomDataGrid from "../CustomDataGrid";
// import Util from "../";

// const PageWithTabs = () => {
//   const [activeTab, setActiveTab] = useState("users");

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };
//   let columns = [];

//   if (activeTab === "posts") {
//     columns = [
//       { field: "userId", headerName: "User Id", width: 90 },
//       { field: "id", headerName: "id", width: 150 },
//       { field: "title", headerName: "Title", width: 150 },
//       { field: "body", headerName: "Body", width: 110 },
//     ];
//   } else if (activeTab === "comments") {
//     columns = [
//       { field: "postId", headerName: "Post Id", width: 90 },
//       { field: "id", headerName: "id", width: 150 },
//       { field: "name", headerName: "Name", width: 150 },
//       { field: "email", headerName: "Email", width: 110 },
//       { field: "body", headerName: "Body", width: 150 },
//     ];
//   } else if (activeTab === "users") {
//     columns = [
//       { field: "id", headerName: "Id", width: 90 },
//       { field: "name", headerName: "Name", width: 150 },
//       { field: "username", headerName: "User Name", width: 150 },
//       { field: "email", headerName: "Email", width: 110 },
//       { field: "phone", headerName: "Phone", width: 110 },
//       { field: "website", headerName: "Website", width: 110 },
//       { field: "company.name", headerName: "Company", width: 110 },
//     ];
//   }
//   return (
//     <div>
//       <div className="flex">
//         <button
//           className={`py-2 px-4 mr-2 ${
//             activeTab === "users"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-300 text-gray-700"
//           }`}
//           onClick={() => handleTabChange("users")}
//         >
//           Users
//         </button>
//         <button
//           className={`py-2 px-4 mr-2 ${
//             activeTab === "posts"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-300 text-gray-700"
//           }`}
//           onClick={() => handleTabChange("posts")}
//         >
//           Posts
//         </button>
//         <button
//           className={`py-2 px-4 ${
//             activeTab === "comments"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-300 text-gray-700"
//           }`}
//           onClick={() => handleTabChange("comments")}
//         >
//           Comments
//         </button>
//       </div>

//       {activeTab === "users" && (
//         <CustomDataGrid type="users" columns={columns} rows={data} />
//       )}
//       {activeTab === "posts" && (
//         <CustomDataGrid type="posts" columns={columns} rows={data} />
//       )}
//       {activeTab === "comments" && (
//         <CustomDataGrid type="comments" columns={columns} rows={data} />
//       )}
//     </div>
//   );
// };

// export default PageWithTabs;
