# Front End Test
An ReactJS focused take home test for Front-end Developers.

### Instructions
* Clone this repo
* Complete this exercise and submit either a zip of the solution or a link to a new repo
* Please incorporate ReactJS framework into your solution. All other choices of libraries, frameworks, etc. are up to you.
* Also show case the use of any State Management libraries (e.g. redux, mobx, react-query, etc.) in the application.

### Requirements
* Solution should be responsive
* Use the [JSON Placeholder](https://jsonplaceholder.typicode.com/) API to fetch data for Users, Posts, Comments.
* Create a reusable Data-Grid Component to render the Data in tabular format. (**Do not use any external libraries**)
* User should be able to navigate between the different Data-Grids.
* Should be a single-page application.
* Data-Grid should have following features implemented:
	- Pagination Option
		* Results should be fetched using pagination (?_start=n&_limit=m).
		* Results to be cached once fetched.
		* User should be able to see total number of pages available. (https://github.com/typicode/jsonplaceholder/issues/49)
	- Filtering
		* GlobalSearch - There should be a search input to filter the data in Data-Grid using searchword.
		* There should be a filter option to select a specific attribute and value to be filtered.
	- Sorting
		* All columns should be sortable.

### Bonus
* Using Typescript.
* Use of latest React Hooks and Context APIs will be preferred.
* Unit Testing
* Project Layout Structure.

## Pending :-
1. Should be responsive
2. UI needs to be changed
3. Need to use TypeScript
4. Unit Testing
5. Will Context API will be needed? --- Later see
6. During pagination , results needs to be fetched once cached --LocalStorage (implemmted) --- DONE