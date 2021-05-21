import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import React, { SetStateAction } from "react";
import { useAppSelector } from "../../app/hooks";

const AuthComponent = () => {
  const darkMode = useAppSelector((state) => state.darkMode.status);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: SetStateAction<number>) => {
    setValue(newValue);
  };
  const useStyles = makeStyles({
    paper: {
      background: darkMode
        ? "linear-gradient(45deg, #393e46 5%, #707793 90%)"
        : "linear-gradient(45deg, #3bba9c 30%, #707793 90%)",
      opacity: 0.8,
      color: "#EEEEEE",
    },
    tab: {
      color: "#EEEEEE",
      textTransform: "none",
      //fontWeight: 300,
      "&:focus": {
        color: "#EEEEEE",
      },
      "&:hover": {
        color: "#EEEEEE",
      },
    },
  });

  const classes = useStyles();
  //#686D76
  return (
    <Paper className={classes.paper} square>
      <Tabs
        centered
        value={value}
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab className={classes.tab} label="Sign In" />
        <Tab className={classes.tab} label="Sign Up" />
      </Tabs>
    </Paper>
  );
};

export default AuthComponent;
