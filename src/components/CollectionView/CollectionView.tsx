import { Box, makeStyles, Typography, useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  CollectionItem,
  getCollections,
} from "../../slices/collection-slice/collectionSlice";
import AddItemComponent from "../AddItemComponent/AddItemComponent";
import LinkCollection from "../LinkCollectionComponent/LinkCollection";
import AddCollectionModal from "../AddCollectionModal/AddCollectionModal";

const CollectionView = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.darkMode.status);
  const [addCollectionModalOpen, setAddCollectionModalOpen] =
    React.useState(false);
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
  /*Use Effect -- ComponentWillMount */
  useEffect(() => {
    console.log("Print this when component is mounted");
    dispatch(getCollections());
  }, [dispatch]);

  /*Get Collections From API */
  const collectionsList = useAppSelector(
    (state) => state.collection.collectionList
  );

  const collectionMap = collectionsList.map((item: CollectionItem) => {
    return (
      <LinkCollection
        collectionId={item.collectionId}
        collectionTitle={item.collectionTitle}
        onClick={() => {
          console.log("clicked on a collection");
        }}
      />
    );
  });

  return (
    <>
      <Typography className={classes.title}>
        <Box fontWeight={200}>Collections</Box>
      </Typography>
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
    </>
  );
};

export default CollectionView;
