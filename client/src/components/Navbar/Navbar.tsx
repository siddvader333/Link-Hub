import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  Switch,
  Box,
  Link,
} from "@material-ui/core";
import React from "react";
import DarkModeIcon from "@material-ui/icons/Brightness2";
import { darkModeToggle } from "../../slices/darkmode-slice/darkModeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLocation } from "react-router";
import signOut from "../../slices/auth-slice/thunks/signOut";

const NavBar = () => {
  const darkMode = useAppSelector((state) => state.darkMode.status);
  const accessToken = useAppSelector((state) => state.auth.authData.token);
  const dispatch = useAppDispatch();
  const onToggleDarkMode = () => {
    dispatch(darkModeToggle());
  };
  const useStyles = makeStyles({
    navbar: {
      backgroundColor: "transparent",
      height: "10vh",
      boxShadow: "none",
      border: "10px",
    },
    title: {
      fontSize: "40px",
      marginLeft: "5%",
      marginTop: "2vh",
      flex: 1,
      color: "#3bba9c",
      opacity: 1.0,
    },
    navLink: {
      fontSize: "25px",
      marginLeft: "auto",
      marginRight: "20px",
      marginTop: "2vh",
      color: "#3bba9c",
      opacity: 1.0,
      "&:hover": {
        color: darkMode ? "#EEEEEE" : "#707793",
        cursor: "pointer",
      },
    },
  });

  const classes = useStyles();
  const location = useLocation();
  const condensedNav = location.pathname === "/";
  return (
    <AppBar className={classes.navbar} position="sticky">
      <Toolbar>
        {!condensedNav ? (
          <>
            <Typography className={classes.title}>
              <Box fontWeight={200}>Link Hub</Box>
            </Typography>
            <Link
              onClick={() => {
                dispatch(signOut({ accessToken: accessToken }));
              }}
              className={classes.navLink}
            >
              <Box fontWeight={200}>Sign Out</Box>
            </Link>
          </>
        ) : (
          <div className={classes.title}></div>
        )}
        <DarkModeIcon />
        <Switch
          onChange={onToggleDarkMode}
          color="default"
          checked={darkMode}
        />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
//linear-gradient(45deg, #3c3f58 30%, #707793 90%)
//linear-gradient(45deg, #3bba9c 30%, #707793 90%)
