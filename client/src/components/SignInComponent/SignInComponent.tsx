import { makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import signIn from "../../slices/auth-slice/thunks/signIn";
import StyledButton from "../common/StyledButton";
import StyledTextInput from "../common/StyledTextInput";

const SignInComponent = (props: any) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useAppDispatch();
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
      <StyledTextInput
        onChange={(event: any) => {
          setEmail(event.target.value);
        }}
        label="Email"
      />
      <StyledTextInput
        onChange={(event: any) => {
          setPassword(event.target.value);
        }}
        label="Password"
        type="password"
      />
      <StyledButton
        text="Login"
        onClick={() => {
          dispatch(
            signIn({
              email: email,
              password: password,
            })
          );
        }}
      />
    </Paper>
  );
};

export default SignInComponent;
