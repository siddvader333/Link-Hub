import { Box, makeStyles, Typography, useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CollectionItem } from "../../slices/collection-slice/collectionSlice";
import AddItemComponent from "../AddItemComponent/AddItemComponent";
import AddCollectionModal from "../AddCollectionModal/AddCollectionModal";
import getCollections from "../../slices/collection-slice/thunks/getCollections";
import CollectionDisplay from "../CollectionDisplayComponent/CollectionDisplay";

const CollectionView = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.darkMode.status);
  const accessToken = useAppSelector((state) => state.auth.authData.token);
  /*Get Collections From API */
  const collectionsList = useAppSelector(
    (state) => state.collection.collectionList
  );
  const [addCollectionModalOpen, setAddCollectionModalOpen] =
    React.useState(false);

  /*Use Effect -- ComponentWillMount */
  useEffect(() => {
    console.log("Print this when component is mounted");
    dispatch(getCollections({ token: accessToken }));
  }, [dispatch, accessToken]);

  const theme = useTheme();
  const useStyles = makeStyles({
    displayDiv: {
      width: "60%",
      marginLeft: "20%",
      marginRight: "20%",
      marginTop: "2.5vh",
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
      marginTop: "2.5vh",
    },
  });
  const classes = useStyles();

  const collectionMap = collectionsList.map((item: CollectionItem) => {
    return (
      <CollectionDisplay
        key={item.collectionId}
        collectionId={item.collectionId}
        collectionTitle={item.collectionTitle}
      />
    );
  });

  return (
    <>
      <Typography className={classes.title}>
        <Box fontWeight={200}>Collections</Box>
      </Typography>
      <div className={classes.displayDiv}>
        <AddItemComponent
          onClick={() => {
            setAddCollectionModalOpen(true);
          }}
          text={"+ Add New Link Collection"}
        />
        <AddCollectionModal
          modalOpen={addCollectionModalOpen}
          handleClose={() => {
            setAddCollectionModalOpen(false);
          }}
        />
        {collectionMap}
      </div>
    </>
  );
};

export default CollectionView;
