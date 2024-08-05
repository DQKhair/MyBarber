import React from "react";

import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const ProductById = ({ product }) => {
  if (!product) {
    return (
      <div>
        <Alert severity="error">Product not found</Alert>
      </div>
    );
  }

  return (
    <>
      <Container maxWidth="sm">
        <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
          Product Detail
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
                label="Product ID"
                defaultValue={product.ItemCategory_ID}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
              <TextField
                id="standard-read-only-input"
                label="Product name"
                defaultValue={product.ItemCategoryName}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
              <TextField
                id="standard-read-only-input"
                label="Price"
                defaultValue={`${product.ItemCategoryPrice} đ`}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
              <TextField
                id="standard-read-only-input"
                label="Category ID"
                defaultValue={product.Category_ID}
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

export default ProductById;
