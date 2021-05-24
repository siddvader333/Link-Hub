import {
  makeStyles,
  Paper,
  Tab,
  Tabs,
  TextField,
  Button,
} from "@material-ui/core";
import React, { SetStateAction } from "react";
import { useAppSelector } from "../../app/hooks";
import SignInComponent from "../SignInComponent/SignInComponent";
import SignUpComponent from "../SignUpComponent/SignUpComponent";

const AuthComponent = () => {
  const darkMode = useAppSelector((state) => state.darkMode.status);
  const [value, setValue] = React.useState(0);

  const toggleValue = () => {
    if (value) {
      setValue(0);
    } else {
      setValue(1);
    }
  };

  const handleChange = (event: any, newValue: SetStateAction<number>) => {
    console.log(newValue);
    setValue(newValue);
  };
  const useStyles = makeStyles({
    paper: {
      background: darkMode
        ? "linear-gradient(45deg, #3bba9c 30%, #707793 90%)"
        : "linear-gradient(45deg, #3bba9c 30%, #707793 90%)",
      opacity: 0.9,
      color: "#EEEEEE",
    },
    paper2: {
      height: "70vh",
      //background: '#707793',
      opacity: 0.9,
    },
    tab: {
      color: darkMode ? "white" : "#EEEEEE",
      opacity: 1.0,
      textTransform: "none",
      "&:focus": {
        color: darkMode ? "white" : "#EEEEEE",
        opacity: 1.0,
      },
      "&:hover": {
        color: darkMode ? "#white" : "#EEEEEE",
        opacity: 1.0,
      },
    },
    inputField: {
      marginTop: "5vh",
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
    loginButton: {
      width: "50%",
      margin: "4.5vh 25% 3.5vh 25%",
      padding: "1.5vh 0% 1.5vh 0%",
      background: darkMode
        ? "linear-gradient(45deg, #393e46 5%, #707793 90%)"
        : "linear-gradient(45deg, #3bba9c 30%, #707793 90%)",
      opacity: 0.85,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease 0s",
      cursor: "pointer",
      outline: "none",
      color: "rgb(226, 226, 226)",
      borderRadius: "500px",
      "&:hover": {
        background: darkMode
          ? "linear-gradient(45deg, #393e46 5%, #707793 90%)"
          : "linear-gradient(45deg, #3bba9c 30%, #707793 90%)",
        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
        color: "#fff",
        transform: "translateY(-15%)",
        border: "none",
        opacity: 1.0,
      },
    },
  });

  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paper} square>
        <Tabs
          centered
          value={value}
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          indicatorColor="primary"
        >
          <Tab className={classes.tab} label="Sign In" />
          <Tab className={classes.tab} label="Sign Up" />
        </Tabs>
      </Paper>
      {value ? <SignUpComponent /> : <SignInComponent />}
    </div>
  );
};

export default AuthComponent;
