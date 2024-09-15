import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteForm = ({ deleteItemCategory, itemCategory, openDelete, handleClose }) => {

  // submit form
  const handleAcceptDelete = async (itemCategoryID) => {
    const result = await deleteItemCategory(itemCategoryID);
    if(result)
    {
      alert("Delete Successful!")
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
          {`DELETE ${itemCategory.itemCategoryName}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            {`Are you sure delete ${itemCategory.itemCategoryName} with ID: ${itemCategory.itemCategory_ID} ?`}
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
            onClick={() => handleAcceptDelete(itemCategory.itemCategory_ID)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteForm;
