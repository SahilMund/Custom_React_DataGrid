import { useEffect, useState } from "react";
import "./App.css";
import CustomDataGrid from "./CustomDataGrid";
import axios from "axios";

function App() {
  const [activeTab, setActiveTab] = useState("users");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(0);

  const BASE_URI = "https://jsonplaceholder.typicode.com";
  // ?_start=1&_limit=2

  const fetchData = async () => {
    try {
      const startInd = (currentPage - 1) * itemsPerPage;
      const response = await axios.get(
        `${BASE_URI}/${activeTab}?_start=${startInd}&_limit=${itemsPerPage}`
      );

      const allResponse = await axios.get(`${BASE_URI}/${activeTab}`);

      setData(response.data);
      // console.log(response.data.length);
      setTotalPages(Math.ceil(allResponse.data.length / itemsPerPage));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    // store in localstoarge
    data && data.length !== 0 && storeDataToLocalStorage(activeTab, data);
  }, [activeTab, currentPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset current page when tab changes
  };
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

  const getLocalStorageData = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };
  const storeDataToLocalStorage = (key, val) => {
    return localStorage.setItem(key, JSON.stringify(val));
  };
  return (
    <div>
      <div className="flex">
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

      {/* {activeTab === "users" && (
        <CustomDataGrid type="users" columns={columns} rows={data} />
      )}
      {activeTab === "posts" && (
        <CustomDataGrid type="posts" columns={columns} rows={data} />
      )}
      {activeTab === "comments" && (
        <CustomDataGrid type="comments" columns={columns} rows={data} />
        )} */}

      <CustomDataGrid
        type={activeTab}
        columns={columns}
        rows={data && data.length !== 0 ? data : getLocalStorageData(activeTab)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default App;
