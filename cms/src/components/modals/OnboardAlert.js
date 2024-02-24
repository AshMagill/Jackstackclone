import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const OnboardingCheckPopup = ({ onboarded }) => {
  // State to control the open state of the dialog
  const [open, setOpen] = React.useState(!onboarded);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Onboarding Required"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please onboard with Stripe to continue. The Stripe onbarding link can
          be found in the dropdown menu near the top right corner of the screen.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OnboardingCheckPopup;
