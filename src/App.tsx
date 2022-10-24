import React from 'react';
import Editor from "./components/ckeditor";
import CollapseButton from "./components/tables/renderers/collapseButton";
import GridExample from "./components/tables/ag-grid";

const App = () => {

  const mockConfig = [
    {
      minWidth: 150,
      field: "country",
    },
    {
      minWidth: 150,
      field: "athlete",
    },
    {
      field: "gold",
      minWidth: 150,
    },
    {
      minWidth: 150,
      field: "silver",
    },
    {
      minWidth: 150,
      field: "bronze",
    },
    {
      minWidth: 150,
      field: "total",
    },
  ];

  const mockData = [
    {
      athlete: "Michael Phelps",
      age: 23,
      country: "United States",
      year: 2008,
      date: "24/08/2008",
      sport: "Swimming",
      gold: 8,
      silver: 0,
      bronze: 0,
      total: 8,
    },
    {
      athlete: "Michael Phelps",
      age: 23,
      country: "United States",
      year: 2008,
      date: "24/08/2008",
      sport: "Swimming",
      gold: 8,
      silver: 0,
      bronze: 0,
      total: 8,
    },
    {
      athlete: "Michael Phelps",
      age: 23,
      country: "United States",
      year: 2008,
      date: "24/08/2008",
      sport: "Swimming",
      gold: 8,
      silver: 0,
      bronze: 0,
      total: 8,
    },
  ];

  return (
    <div className="App">
      <h2>CKEditor</h2>
      <Editor/>
      <h2>AG-Grid</h2>
      <GridExample columnDefs={mockConfig} data={mockData}/>
    </div>
  );
}

export default App;
