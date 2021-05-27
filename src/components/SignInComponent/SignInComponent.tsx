import { makeStyles, Paper } from "@material-ui/core";
import React from "react";
import StyledButton from "../common/StyledButton";
import StyledTextInput from "../common/StyledTextInput";

const SignInComponent = (props: any) => {
  const useStyles = makeStyles({
    paper: {
      height: "40vh",
      paddingTop: "1vh",
      //background: '#707793',
      opacity: 0.9,
    },
  });

  const classes = useStyles();
  return (
    <Paper className={classes.paper} square>
      <StyledTextInput label="Email" />
      <StyledTextInput label="Password" type="password" />
      <StyledButton text="Login" onClick={props.onSubmit} />
    </Paper>
  );
};

export default SignInComponent;
