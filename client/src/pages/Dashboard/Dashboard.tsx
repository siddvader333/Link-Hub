import { makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router";
import { useAppSelector } from "../../app/hooks";
import CollectionView from "../../components/CollectionView/CollectionView";
import LinkView from "../../components/LinkView/LinkView";

const Dashboard = () => {
  const darkMode = useAppSelector((state) => state.darkMode.status);
  /*const collectionSelected = useAppSelector(
    (state) => state.link.selectedCollectionId !== undefined
  );*/

  const theme = useTheme();
  const useStyles = makeStyles({
    displayDiv: {
      width: "60%",
      marginLeft: "20%",
      marginRight: "20%",
      marginTop: "10vh",
      height: "70vh",
      overflowY: "auto",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        marginLeft: "10%",
      },
    },
    title: {
      fontSize: "40px",
      color: darkMode ? "#aad8d3" : "#3bba9c",
      marginBottom: "10px",
      textAlign: "center",
    },
  });
  const classes = useStyles();

  /*Get Links From API */
  return (
    <div className={classes.displayDiv}>
      <Switch>
        <Route exact path="/dashboard/links" component={LinkView} />
        <Route component={CollectionView} />
      </Switch>
    </div>
  );
};

export default Dashboard;
