# Custom React DataGrid


This is a custom DataGrid component built using ReactJS framework. It allows users to fetch and display data from the JSON Placeholder API in a tabular format.
The solution incorporates various features such as pagination, filtering, and sorting to enhance the usability of the DataGrid and these all functionalities are implemented without any external library.

## Technology :-

- React.JS
- Context API
- Axios
- React Hooks and Custom Hooks

<br>

## Deployed URL :- [Link 👉](https://sahilmund.github.io/Custom_React_DataGrid/)

## Steps to run the project :-

#### Step 1 :- Clone the repo

```
git clone https://github.com/SahilMund/Custom_React_DataGrid.git
```

#### Step 2 :- Navigate to Custom_React_DataGrid folder

```
cd Custom_React_DataGrid
```

#### Step 3 :- To install the dependencies

```
npm install
```

#### Step 4 :- To run the application

```
npm start
```

5. Open your browser and visit http://localhost:3000 to see the application running.

<hr/>

### Features

Data-Grid Component
The core of the application is the reusable DataGrid component. It is responsible for rendering the data in a tabular format with various functionalities.

1. Pagination:-

- Users can navigate through the pages of data using the pagination feature.
- The data is fetched from the JSON Placeholder API using pagination parameters (?\_start=n&\_limit=m).
- Once fetched, the results are cached to improve performance i.e. by storing in localStorage.
- The component displays the total number of pages available.

2. Filtering:-
   <u><b>Global Search:</b></u>

- <u><b>Global Search:- </b></u> Users can filter the data in the DataGrid by entering a search keyword in the global search input.
- <u><b>Attribute Filtering:- </b></u> Users can filter the value only for specific attributes.

3. Sorting:-

- Users can sort the data by clicking on up and down arrow Icon present in the column headers.
- All columns in the DataGrid are sortable.

4. State Management:-
- The application utilizes React Hooks and Context APIs for state management.

5. Responsive Design:-
- The solution is designed to be responsive, ensuring a seamless user experience across different devices and screen sizes.

6. Project Structure:-
-  The project follows a structured layout to maintain organization and modularity.

### overview of the project structure:-

- src/components: Contains reusable components, including the DataGrid component.
- src/hooks: Contains custom hooks used in the application.
- src/services: Contains JSON Placeholder API endpoints.
- src/utils: Contains utility functions used in the application.

## Conclusion

The Custom React DataGrid is a powerful and flexible component that allows you to fetch, display, and interact with data in a tabular format. It demonstrates the use of ReactJS, state management libraries, and various features like pagination, filtering, and sorting.
