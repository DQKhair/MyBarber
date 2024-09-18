import React, { useState, useEffect } from "react";
import useCustomers from "../../hook/useCustomers";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const QuantityCustomer = () => {
  const [quantityCustomer, setQuantityCustomer] = useState(0);

  const { loading, error, customers } = useCustomers();

  useEffect(() => {
    setQuantityCustomer(customers.length);
  }, [customers]);


  if (loading)
    return (
      <div>
        <Box sx={{ display: "flex" }}>
          <CircularProgress /> Loading...
        </Box>
      </div>
    );

  if (error)
    return (
      <div>
        <Alert severity="error">Error: {error.message}</Alert>
      </div>
    );

  return (
    <>
      <h2 className="mb-5">{quantityCustomer} person</h2>
      <h6 className="card-text text-uppercase">My Barber</h6>
    </>
  );
};

export default QuantityCustomer;
