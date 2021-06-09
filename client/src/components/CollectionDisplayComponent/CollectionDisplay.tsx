import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import EditIcon from "@material-ui/icons/Edit";
import EditCollectionModal from "../EditCollectionModal/EditCollectionModal";
import StyledButton from "../common/StyledButton";
import getLinksByCollection from "../../slices/link-slice/thunks/getLinksByCollection";
import history from "../../utils/history";
import openCollection from "../../slices/collection-slice/thunks/openCollection";

export interface CollectionDisplayProps {
  collectionTitle: string | undefined;
  collectionId: string | undefined;
}

const CollectionDisplay = (props: CollectionDisplayProps) => {
  const [editCollectionModalOpen, setEditCollectionModalOpen] =
    React.useState(false);
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.darkMode.status);
  const accessToken = useAppSelector((state) => state.auth.authData.token);
  const linkList = useAppSelector((state) => state.link.linkList);
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
    collectionTitle: {
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
    <div
      onClick={
        editCollectionModalOpen
          ? undefined
          : () => {
              dispatch(
                getLinksByCollection({
                  collectionId: props.collectionId,
                  collectionTitle: props.collectionTitle,
                  accessToken: accessToken,
                })
              );
              history.push("/dashboard/links");
            }
      }
      className={classes.linkDisplayDiv}
    >
      <Grid container>
        <Grid item xs={12} sm={7}>
          <div className={classes.info}>
            <Typography className={classes.collectionTitle}>
              {props.collectionTitle}
              <> </>
              <EditIcon
                onClick={(event) => {
                  setEditCollectionModalOpen(true);
                  event.stopPropagation();
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
            <StyledButton
              onClick={() => {
                dispatch(
                  getLinksByCollection({
                    collectionId: props.collectionId,
                    collectionTitle: props.collectionTitle,
                    accessToken: accessToken,
                  })
                );
                dispatch(openCollection({ linkList: linkList }));
              }}
              text="Open All"
            />
          </div>
        </Grid>
      </Grid>
      <EditCollectionModal
        collectionId={props.collectionId}
        modalOpen={editCollectionModalOpen}
        handleClose={() => {
          console.log("close modal here");
          setEditCollectionModalOpen(false);
        }}
      />
    </div>
  );
};

export default CollectionDisplay;
