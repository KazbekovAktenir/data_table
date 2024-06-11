import React from "react";

const Table = ({ data, handleSort, sortConfig, setSelectedRow }) => {
  const getClassNamesFor = (name) => {
    if (!sortConfig) return;
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {["id", "firstName", "lastName", "email", "phone"].map((key) => (
            <th
              key={key}
              onClick={() => handleSort(key)}
              className={getClassNamesFor(key)}
            >
              {key}{" "}
              {getClassNamesFor(key) === "ascending"
                ? "↑"
                : getClassNamesFor(key) === "descending"
                ? "↓"
                : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} onClick={() => setSelectedRow(row)}>
            <td>{row.id}</td>
            <td>{row.firstName}</td>
            <td>{row.lastName}</td>
            <td>{row.email}</td>
            <td>{row.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
