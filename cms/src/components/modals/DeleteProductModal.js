import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteConfirmationModal = ({ openDelete, handleCloseDelete }) => {
  const handleDelete = () => {
    // Perform the delete operation here
    console.log("Item has been deleted");
    handleCloseDelete();
  };
  return (
    <Dialog open={openDelete} onClose={handleCloseDelete}>
      <DialogTitle>{"Are you sure you want to delete this item?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDelete}>Cancel</Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
