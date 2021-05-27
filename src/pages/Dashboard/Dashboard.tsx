import { makeStyles, useTheme, Typography, Box } from "@material-ui/core";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import AddItemComponent from "../../components/AddItemComponent/AddItemComponent";
import LinkCollection from "../../components/LinkCollectionComponent/LinkCollection";
import LinkDisplay from "../../components/LinkDisplayComponent/LinkDisplay";

const Dashboard = () => {
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
  return (
    <div className={classes.displayDiv}>
      {viewCollections === true ? (
        <>
          <Typography className={classes.title}>
            <Box fontWeight={200}>Collections</Box>
          </Typography>
          <AddItemComponent text={"+ Add New Link Collection"} />
          <LinkCollection
            collectionId={"124123423"}
            linkTitle={"Social Media Links"}
            onClick={() => {
              console.log("hello");
              setViewCollections(false);
            }}
          />
          <LinkCollection
            collectionId={"124123423"}
            linkTitle={"Social Media Links"}
            onClick={(e) => {
              console.log(e.target);
              console.log("hello");
              setViewCollections(false);
            }}
          />
          <LinkCollection
            collectionId={"124123423"}
            linkTitle={"Social Media Links"}
            onClick={() => {
              console.log("hello");
              setViewCollections(false);
            }}
          />
          <LinkCollection
            collectionId={"124123423"}
            linkTitle={"Social Media Links"}
            onClick={() => {
              console.log("hello");
              setViewCollections(false);
            }}
          />
        </>
      ) : (
        <>
          <Typography className={classes.title}>
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
