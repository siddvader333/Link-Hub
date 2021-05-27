import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import EditIcon from "@material-ui/icons/Edit";
import EditCollectionModal from "../EditCollectionModal/EditCollectionModal";
import StyledButton from "../common/StyledButton";

export interface LinkCollectionProps {
  linkTitle: string;
  collectionId: string;
  onClick: (e: any) => void;
}

const LinkCollection = (props: LinkCollectionProps) => {
  const [editCollectionModalOpen, setEditCollectionModalOpen] =
    React.useState(false);
  const darkMode = useAppSelector((state) => state.darkMode.status);
  const useStyles = makeStyles({
    linkDisplayDiv: {
      borderRadius: "25px",
      border: "2px ",
      color: darkMode ? "#aad8d3" : "#3bba9c",
      margin: "2vh 3% 2vh 3% ",
      padding: "2vh 5% 2vh 5%",
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
    collectionId: {
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
    editButton: {
      "&:hover": {
        cursor: "pointer",
      },
    },
  });

  const classes = useStyles();
  return (
    <div onClick={props.onClick} className={classes.linkDisplayDiv}>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <div className={classes.info}>
            <Typography className={classes.linkTitle}>
              {props.linkTitle}
              <> </>
              <EditIcon
                onClick={(e) => {
                  console.log("sup");
                  setEditCollectionModalOpen(true);
                  e.stopPropagation();
                }}
                className={classes.editButton}
              />
            </Typography>
            <Typography className={classes.collectionId}>
              Collection Id: {props.collectionId}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={5}>
          <div className={classes.buttonDiv}>
            <StyledButton text="Open All" />
          </div>
        </Grid>
      </Grid>
      <EditCollectionModal
        collectionTitle="sdsdfsd"
        modalOpen={editCollectionModalOpen}
        handleClose={() => {
          setEditCollectionModalOpen(false);
        }}
      />
    </div>
  );
};

export default LinkCollection;
