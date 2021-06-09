import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearAuthError } from "../../slices/auth-slice/authSlice";
import { clearCollectionError } from "../../slices/collection-slice/collectionSlice";
import { clearLinkError } from "../../slices/link-slice/linkSlice";
import StyledButton from "../common/StyledButton";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const ErrorAlert = () => {
  console.log("dfcsdc");
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] =
    React.useState<string | undefined>(undefined);
  const [errorType, setErrorType] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  /*Error Listeners */
  /*Auth, Collection, Link,  */
  const authError = useAppSelector((state) => state.auth.errorMessage);
  const collectionError = useAppSelector(
    (state) => state.collection.errorMessage
  );
  const linkError = useAppSelector((state) => state.link.errorMessage);

  useEffect(() => {
    console.log("error");
    if (authError !== undefined) {
      setErrorMessage(authError);
      setErrorType("auth");
      setOpen(true);
    } else if (collectionError !== undefined) {
      setErrorMessage(collectionError);
      setErrorType("collection");
      setOpen(true);
    } else if (linkError !== undefined) {
      setErrorMessage(linkError);
      setErrorType("link");
      setOpen(true);
    }
  }, [authError, collectionError, linkError]);

  const clearErrorMessage = () => {
    if (errorType === "auth") {
      dispatch(clearAuthError());
      setErrorMessage(undefined);
      setOpen(false);
    } else if (errorType === "collection") {
      dispatch(clearCollectionError());
      setErrorMessage(undefined);
      setOpen(false);
    } else if (errorType === "link") {
      dispatch(clearLinkError());
      setErrorMessage(undefined);
      setOpen(false);
    }
  };

  console.log(errorMessage !== undefined);
  return (
    <>
      {errorMessage !== undefined ? (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={5000}
          onClose={clearErrorMessage}
          message={errorMessage}
        ></Snackbar>
      ) : undefined}
    </>
  );
};

export default ErrorAlert;
