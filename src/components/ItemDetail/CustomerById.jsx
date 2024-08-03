import React from "react";

const CustomerById = ({ customer }) => {

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <>
      <div>
        <h1>Customer Detail</h1>
        <p>
          <strong>Name:</strong> {customer.CustomerName}
        </p>
        <p>
          <strong>Phone:</strong> {customer.CustomerPhone}
        </p>
      </div>
    </>
  );
};

export default CustomerById;
