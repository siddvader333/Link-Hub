import { makeStyles, useTheme, Typography, Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import AddItemComponent from "../../components/AddItemComponent/AddItemComponent";
import LinkCollection from "../../components/LinkCollectionComponent/LinkCollection";
import LinkDisplay from "../../components/LinkDisplayComponent/LinkDisplay";
import { CollectionItem } from "../../slices/collection-slice/collectionSlice";
import { getCollections } from '../../slices/collection-slice/collectionSlice';
import StyledButton from "../../components/common/StyledButton";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [viewCollections, setViewCollections] = React.useState(true);
  const darkMode = useAppSelector((state) => state.darkMode.status);
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
  useEffect(() =>{
    console.log("Print this when component is mounted");
    //dispatch(getCollections())
  
  }, [])
  /*Get Collections From API */
  const collectionsList = useAppSelector((state) => state.collection.collectionList);
  const collectionMap = viewCollections ? collectionsList.map((item: CollectionItem) => {
    return <LinkCollection
      collectionId={item.collectionId}
      collectionTitle={item.collectionTitle}
      onClick={() =>{setViewCollections(false)}}/>
  }) : undefined;

  console.log(collectionsList);
  console.log(collectionMap);
  /*Get Links From API */
  return (
    <div className={classes.displayDiv}>
      {viewCollections === true ? (
        <>
          <Typography component={'span'} className={classes.title}>
            <Box fontWeight={200}>Collections</Box>
          </Typography>
          <AddItemComponent text={"+ Add New Link Collection"} />
          <StyledButton text="sup" onClick={() => {dispatch(getCollections())}}/>
          {collectionMap}
        </>
      ) : (
        <>
          <Typography component={'span'} className={classes.title}>
            <Box fontWeight={200}>Links</Box>
          </Typography>
          <AddItemComponent text={"+ Add New Link"} />
          <LinkDisplay
            linkUrl="https://www.netflix.ca"
            linkId="123905782"
            linkTitle="Netflix"
          />
          <LinkDisplay
            linkUrl="https://www.netflix.ca"
            linkId="123905782"
            linkTitle="Netflix"
          />
          <LinkDisplay
            linkUrl="https://www.netflix.ca"
            linkId="123905782"
            linkTitle="Netflix"
          />
          <LinkDisplay
            linkUrl="https://www.netflix.ca"
            linkId="123905782"
            linkTitle="Netflix"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
