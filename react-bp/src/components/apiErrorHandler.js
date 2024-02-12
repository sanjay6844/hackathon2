import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ApiErrorHandler = ({ store }) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = useState(false);
  const [errorDataState, setErrorDataState] = useState("Api Faild");

  const mapApiErrors = () => {
    return Object.values(store).map((x) => x.apiError);
  };

  const getErrorMessage = (errorData) => {
    if (errorData.error) {
      if (typeof errorData.error === "object") {
        if (errorData.error?.message) {
          return errorData.error?.message;
        } else return errorData.error?.error?.message;
      } else if (typeof errorData.error === "string") {
        return errorData.error;
      }
    }
    return "Something Went wrong!";
  };
  const handleClose = (event, reason) => {
    if (reason == "clickaway") {
      return "";
    }
    setOpen(false);
  };

  useEffect(() => {
    const errorData = mapApiErrors().find((x) => !!x);
    if (errorData) {
      setOpen(true);
      setErrorDataState(errorData);
    }
  }, [...mapApiErrors()]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={"error"} sx={{ width: "100%" }}>
        {getErrorMessage(errorDataState)}
      </Alert>
    </Snackbar>
  );
};

export default ApiErrorHandler;
