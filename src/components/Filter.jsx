import React from "react";

const Filter = ({ filterText, setFilterText, handleFilter }) => {
  return (
    <div className="my-3">
      <input
        type="text"
        className="form-control"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Enter text to filter"
      />
      <button onClick={handleFilter} className="btn btn-primary mt-2">
        Find
      </button>
    </div>
  );
};

export default Filter;
