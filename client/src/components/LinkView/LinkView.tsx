import { Box, makeStyles, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import AddItemComponent from "../AddItemComponent/AddItemComponent";
import { LinkItem } from "../../slices/link-slice/linkSlice";
import LinkDisplay from "../LinkDisplayComponent/LinkDisplay";
import AddLinkModal from "../AddLinkModal/AddLinkModal";

const LinkView = () => {
  const darkMode = useAppSelector((state) => state.darkMode.status);
  const [addLinkModalOpen, setAddLinkModalOpen] = React.useState(false);
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

  /*Get Collections From API */
  const linkList = useAppSelector((state) => state.link.linkList);

  const linkMap = linkList.map((item: LinkItem) => {
    return (
      <LinkDisplay
        linkId={item.linkId}
        linkTitle={item.linkTitle}
        linkUrl={item.linkUrl}
        onClick={() => {
          console.log("clicked on a Link");
        }}
      />
    );
  });

  return (
    <>
      <Typography className={classes.title}>
        <Box fontWeight={200}>Links</Box>
      </Typography>
      <AddItemComponent
        onClick={() => {
          setAddLinkModalOpen(true);
        }}
        text={"+ Add New Link "}
      />
      <AddLinkModal
        modalOpen={addLinkModalOpen}
        handleClose={() => {
          setAddLinkModalOpen(false);
        }}
      />
      {linkMap}
    </>
  );
};

export default LinkView;