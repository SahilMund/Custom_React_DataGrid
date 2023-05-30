import { useEffect, useState } from "react";
import "./App.css";
import CustomDataGrid from "./components/CustomDataGrid";
import { useData } from "./hooks/DataHook";

function App() {
  // to track current active page
  const [activeTab, setActiveTab] = useState("users");

  // Using useData custom Hook to get the context details
  const context = useData();

  useEffect(() => {
    // Fetch the data for the selected tab and add the data to localStorage
    context.fetchData(activeTab);
  }, [activeTab, context.currentPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    context.setCurrentPage(1); // Reset current page to 1 when tab changes
  };

  // Getting the table headers/column details according to the selected tab
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

          // Making a function which will return the total address i.e. including street, suite and city
          valueGetter: (params) => {
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

  // To Fetch data and pass it as a props to customDataGrid component
  const getRowsData = () =>
    context.data && context.data.length !== 0
      ? context.data
      : getLocalStorageData(activeTab);

  // function to get the data from localStorage
  const getLocalStorageData = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };


  return (
    <div className="app-container card">
      <div className="flex justify-center mt-4">
        <button
          className={`py-2 px-4 mr-2  ${
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
