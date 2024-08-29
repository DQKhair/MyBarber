import React, { useState, useEffect } from "react";
import useEmployees from "../../hook/useEmployees";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const QuantityEmployee = () => {
  const [quantityEmployee, setQuantityEmployee] = useState(0);

  const { loading, error, employees } = useEmployees();

  useEffect(() => {
    setQuantityEmployee(employees.length);
  }, [employees]);


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
      <h2 className="mb-5">{quantityEmployee}</h2>
      <h6 className="card-text">Increased by 3%</h6>
    </>
  );
};

export default QuantityEmployee;
