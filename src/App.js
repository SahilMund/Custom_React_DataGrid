import { useEffect, useState } from "react";
import "./App.css";
import CustomDataGrid from "./components/CustomDataGrid";
import { useData } from "./hooks/DataHook";

function App() {
  const [activeTab, setActiveTab] = useState("users");

  const context = useData();

  useEffect(() => {
    context.fetchData(activeTab);
    // console.log(context.data);
    
    // store in localStorage
  }, [activeTab, context.currentPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    context.setCurrentPage(1); // Reset current page when tab changes
  };

  const getColsData = () => {
    let columns = [];

    if (activeTab === "posts") {
      columns = [
        { field: "userId", headerName: "User Id", width: 90 },
        { field: "id", headerName: "id", width: 150 },
        { field: "title", headerName: "Title", width: 150 },
        { field: "body", headerName: "Body", width: 110 },
      ];
    } else if (activeTab === "comments") {
      columns = [
        { field: "postId", headerName: "Post Id", width: 90 },
        { field: "id", headerName: "id", width: 150 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "email", headerName: "Email", width: 110 },
        { field: "body", headerName: "Body", width: 150 },
      ];
    } else if (activeTab === "users") {
      columns = [
        { field: "id", headerName: "Id", width: 90 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "username", headerName: "User Name", width: 150 },
        { field: "email", headerName: "Email", width: 110 },
        { field: "phone", headerName: "Phone", width: 110 },
        { field: "website", headerName: "Website", width: 110 },
        { field: "company.name", headerName: "Company", width: 110 },
        {
          field: "address",
          headerName: "Address",
          width: 110,
          valueGetter: (params) => {
            // const { street, suite, city } = params?.row?.address;
            const street = params?.row?.address?.street || "";
            const suite = params?.row?.address?.suite || "";
            const city = params?.row?.address?.city || "";
            return params?.row?.address && `${street}, ${suite}, ${city}`;
          },
        },
      ];
    }

    return columns;
  };

  const getRowsData = () =>
    context.data && context.data.length !== 0
      ? context.data
      : getLocalStorageData(activeTab);

  const getLocalStorageData = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };
  
  return (
    <div>
      <div className="flex justify-center mt-4">
        <button
          className={`py-2 px-4 mr-2 ${
            activeTab === "users"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => handleTabChange("users")}
        >
          Users
        </button>
        <button
          className={`py-2 px-4 mr-2 ${
            activeTab === "posts"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => handleTabChange("posts")}
        >
          Posts
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "comments"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => handleTabChange("comments")}
        >
          Comments
        </button>
      </div>

      <CustomDataGrid columns={getColsData()} rows={getRowsData()} />
    </div>
  );
}

export default App;
