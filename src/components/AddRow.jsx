import React, { useState } from "react";

const AddRow = ({ handleAddRow }) => {
  const [newRow, setNewRow] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddRow(newRow);
    setNewRow({ id: "", firstName: "", lastName: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="my-3">
      <div className="form-row">
        {Object.keys(newRow).map((key) => (
          <div className="col" key={key}>
            <input
              type="text"
              className="form-control"
              name={key}
              value={newRow[key]}
              onChange={handleChange}
              placeholder={key}
              required
            />
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-success mt-2">
        Add Row
      </button>
    </form>
  );
};

export default AddRow;
