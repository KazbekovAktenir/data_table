import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Filter from "./components/Filter";
import Detail from "./components/Detail";
import AddRow from "./components/AddRow";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(50);
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterText, setFilterText] = useState("");

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(
      "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
    );
  }, []);

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  const handleFilter = () => {
    const lowercasedFilter = filterText.toLowerCase();
    const filtered = data.filter((item) =>
      Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleAddRow = (newRow) => {
    setData([newRow, ...data]);
    setFilteredData([newRow, ...filteredData]);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="container">
      <h1>React Table</h1>
      <button
        onClick={() =>
          fetchData(
            "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
          )
        }
      >
        Load Small Data
      </button>
      <button
        onClick={() =>
          fetchData(
            "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
          )
        }
      >
        Load Large Data
      </button>
      <Filter
        filterText={filterText}
        setFilterText={setFilterText}
        handleFilter={handleFilter}
      />
      <AddRow handleAddRow={handleAddRow} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          data={currentRows}
          handleSort={handleSort}
          sortConfig={sortConfig}
          setSelectedRow={setSelectedRow}
        />
      )}
      <Pagination
        rowsPerPage={rowsPerPage}
        totalRows={filteredData.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {selectedRow && <Detail selectedRow={selectedRow} />}
    </div>
  );
};

export default App;
