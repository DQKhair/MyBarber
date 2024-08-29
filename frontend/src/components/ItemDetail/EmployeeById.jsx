import React from "react";

import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const EmployeeById = ({ employee }) => {

  if (!employee) {
    return (
      <div>
        <Alert severity="error">Employee not found</Alert>
      </div>
    );
  }

  return (
    <>
      <Container maxWidth="sm">
        <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
          Employee Detail
        </h3>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                id="standard-read-only-input"
                label="Employee ID"
                defaultValue={employee.Employee_ID}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
              <TextField
                id="standard-read-only-input"
                label="Employee name"
                defaultValue={employee.EmployeeName}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
              <TextField
                id="standard-read-only-input"
                label="Employee Phone"
                defaultValue={employee.EmployeePhone}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
              <TextField
                id="standard-read-only-input"
                label="Employee address"
                defaultValue={employee.EmployeeAddress}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
              <TextField
                id="standard-read-only-input"
                label="Email"
                defaultValue={employee.EmployeeEmail}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>

          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default EmployeeById;
