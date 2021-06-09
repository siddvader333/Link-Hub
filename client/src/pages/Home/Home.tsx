import { Box, makeStyles, Typography, useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AuthComponent from "../../components/AuthComponent/AuthComponent";
import silentSignIn from "../../slices/auth-slice/thunks/silentSignIn";
const HomePage = () => {
  const darkMode = useAppSelector((state) => state.darkMode.status);

  /*Use Effect -- ComponentWillMount */
  /*const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("Print this when component is mounted");
    dispatch(silentSignIn());
  }, [dispatch]);*/

  const theme = useTheme();
  const useStyles = makeStyles({
    authDiv: {
      width: "30%",
      marginLeft: "35%",
      marginTop: "10vh",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        marginLeft: "10%",
      },
    },
    title: {
      fontSize: "40px",
      color: darkMode ? "#aad8d3" : "#3bba9c",
      marginBottom: "10px",
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.authDiv}>
      <Typography className={classes.title}>
        <Box fontWeight={200}>Link Hub</Box>
      </Typography>
      <AuthComponent />
    </div>
  );
};

export default HomePage;
