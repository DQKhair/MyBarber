import React, { useState, useEffect } from "react";
import useEmployees from "../../hook/useEmployees";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const EmployeesOnline = () => {
  const [quantityEmployeeOnline, setQuantityEmployeeOnline] = useState(0);

  const { loading, error, employees } = useEmployees();

  useEffect(() => {
    const employeesOnline = employees.filter((e) => e.EmployeeIsActive);
    setQuantityEmployeeOnline(employeesOnline.length);
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
      <h2 className="mb-5">{quantityEmployeeOnline}</h2>
      <h6 className="card-text text-uppercase">My barber</h6>
    </>
  );
};

export default EmployeesOnline;
