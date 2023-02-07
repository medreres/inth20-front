import { IconButton, Snackbar } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
interface SignInPopupProps {
  show: boolean;
  onClose: (e: any) => void;
}

export default function SignInPopup({ show, onClose }: SignInPopupProps) {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Snackbar
      open={show}
      autoHideDuration={6000}
      onClose={onClose}
      message="You have to sign in"
      action={action}
    />
  );
}
