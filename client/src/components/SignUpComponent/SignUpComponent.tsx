import { makeStyles, Paper } from "@material-ui/core";
import React from "react";
import StyledButton from "../common/StyledButton";
import StyledTextInput from "../common/StyledTextInput";

const SignUpComponent = (props: any) => {
  const useStyles = makeStyles({
    paper: {
      height: "60vh",
      paddingTop: "1vh",
      opacity: 0.9,
    },
  });

  const classes = useStyles();
  return (
    <Paper className={classes.paper} square>
      <StyledTextInput label="Name" />
      <StyledTextInput label="Email" />
      <StyledTextInput type="Password" label="Password" />
      <StyledTextInput type="Password" label="Confirm Password" />
      <StyledButton onClick={props.onSubmit} text="Sign Up" />
    </Paper>
  );
};

export default SignUpComponent;
