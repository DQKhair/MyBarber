import React from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteForm = ({ deleteEmployee, employee, openDelete, handleClose }) => {
  // submit form
  const handleAcceptDelete = async (employeeID) => {
    const result = await deleteEmployee(employeeID);
    if(result)
    {
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
          {`DELETE ${employee.employeeName}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            {`Are you sure delete ${employee.employeeName} with ID: ${employee.employee_ID} ?`}
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
            variant="contained"
            color="error"
            onClick={() => handleAcceptDelete(employee.employee_ID)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteForm;
