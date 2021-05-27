import { makeStyles, TextField } from "@material-ui/core";
import React from "react";

export interface StyledTextInputProps {
  label: string;
  type?: string;
  variant?: string;
}

const StyledTextInput = (props: StyledTextInputProps) => {
  const useStyles = makeStyles({
    inputField: {
      marginTop: "3vh",
      color: "blue",
      width: "80%",
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#9DA5C2",
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#9DA5C2",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#9DA5C2",
      },
      "& .MuiOutlinedInput-input": {
        color: "#9DA5C2",
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "#9DA5C2",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "#9DA5C2",
      },
      "& .MuiInputLabel-outlined": {
        color: "#9DA5C2",
      },
      "&:hover .MuiInputLabel-outlined": {
        color: "#9DA5C2",
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "#9DA5C2",
      },
    },
  });

  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      type={props.type}
      label={props.label}
      className={classes.inputField}
    />
  );
};
export default StyledTextInput;
