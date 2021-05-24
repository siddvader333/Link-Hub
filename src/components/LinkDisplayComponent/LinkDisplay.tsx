import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import EditIcon from "@material-ui/icons/Edit";
export interface LinkDisplayProps {
  linkUrl: string;
  linkTitle: string;
  linkId: string;
}

const LinkDisplay = (props: LinkDisplayProps) => {
  const darkMode = useAppSelector((state) => state.darkMode.status);
  const useStyles = makeStyles({
    linkDisplayDiv: {
      borderRadius: "25px",
      border: "2px",
      color: darkMode ? "#aad8d3" : "#3bba9c",
      margin: "2vh 3% 2vh 3% ",
      padding: "2vh 5% 2vh 5%",
      width: "55%",
      backgroundColor: darkMode
        ? "rgba(112, 119, 147, 0.6)"
        : "rgba(244, 244, 244, 0.8)",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
      "&:hover": {
        transform: "translateY(-5%)",
        cursor: "pointer",
        backgroundColor: darkMode
          ? "rgba(112, 119, 147, 0.8)"
          : "rgba(255, 255, 255, 0.7)",
      },
    },
    linkTitle: {
      fontSize: "25px",
      color: darkMode ? "#aad8d3" : "#3bba9c",
      marginBottom: "10px",
    },
    linkId: {
      fontSize: "15px",
      color: darkMode ? "#EEEEEE" : "#707793",
      marginBottom: "10px",
    },
    linkUrl: {
      fontSize: "15px",
      color: darkMode ? "#EEEEEE" : "#707793",
      marginBottom: "10px",
    },
    info: {
      textAlign: "center",
      marginTop: "2.5vh",
      marginBottom: "2.5vh",
    },
    buttonDiv: {
      textAlign: "center",
    },
    openLinkButton: {
      width: "75%",
      margin: "3.5vh 15% 1vh 15%",
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
    editButton: {
      "&:hover": {
        cursor: "pointer",
      },
    },
  });

  const classes = useStyles();
  return (
    <div className={classes.linkDisplayDiv}>
      <Grid container>
        <Grid item xs={12} sm={9}>
          <div className={classes.info}>
            <Typography className={classes.linkTitle}>
              {props.linkTitle}
              <> </>
              <EditIcon className={classes.editButton} />
            </Typography>
            <Typography className={classes.linkId}>
              Link Id: {props.linkId}
            </Typography>
            <Typography className={classes.linkUrl}>
              Link URL: {props.linkUrl}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className={classes.buttonDiv}>
            <Button className={classes.openLinkButton}>Open </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LinkDisplay;
