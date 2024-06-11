import React from "react";

const Detail = ({ selectedRow }) => {
  return (
    <div className="mt-3">
      <h3>Details</h3>
      <p>
        <strong>ID:</strong> {selectedRow.id}
      </p>
      <p>
        <strong>First Name:</strong> {selectedRow.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {selectedRow.lastName}
      </p>
      <p>
        <strong>Email:</strong> {selectedRow.email}
      </p>
      <p>
        <strong>Phone:</strong> {selectedRow.phone}
      </p>
      <p>
        <strong>Address:</strong> {selectedRow.address.streetAddress},{" "}
        {selectedRow.address.city}, {selectedRow.address.state},{" "}
        {selectedRow.address.zip}
      </p>
      <p>
        <strong>Description:</strong> {selectedRow.description}
      </p>
    </div>
  );
};

export default Detail;
