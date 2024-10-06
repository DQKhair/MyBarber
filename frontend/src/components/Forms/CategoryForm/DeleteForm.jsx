import React from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteForm = ({
  loading,
  deleteCategory,
  category,
  openDelete,
  handleClose,
}) => {
  // submit form
  const handleAcceptDelete = async (categoryID) => {
    const result = await deleteCategory(categoryID);
    if (result) {
      toast.success("Delete successful!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    handleClose();
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDelete}
        onClose={() => {
          handleClose();
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "red",
            margin: "30px 0 0 0",
          }}
        >
          {`DELETE ${category.categoryName}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            {`Are you sure delete ${category.categoryName} with ID: ${category.category_ID} ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant="contained"
            color="error"
            onClick={() => handleAcceptDelete(category.category_ID)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteForm;
