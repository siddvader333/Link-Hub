import { makeStyles } from "@material-ui/core";
import React from "react";
import { useAppSelector } from "../../app/hooks";
export interface AddItemComponentProps {
  text: string;
  onClick?: () => any;
}

const AddItemComponent = (props: AddItemComponentProps) => {
  const darkMode = useAppSelector((state) => state.darkMode.status);
  const useStyles = makeStyles({
    linkDisplayDiv: {
      textAlign: "center",
      borderRadius: "25px",
      border: "2px dashed",
      color: darkMode ? "#aad8d3" : "#3bba9c",
      margin: "2vh 3% 2vh 3% ",
      padding: "2vh 5% 2vh 5%",
      backgroundColor: darkMode
        ? "rgba(112, 119, 147, 0.6)"
        : "rgba(244, 244, 244, 0.8)",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        transform: "translateY(-5%)",
        cursor: "pointer",
        backgroundColor: darkMode
          ? "rgba(112, 119, 147, 0.8)"
          : "rgba(255, 255, 255, 0.7)",
      },
    },
  });

  const classes = useStyles();
  return (
    <div onClick={props.onClick} className={classes.linkDisplayDiv}>
      {props.text}
    </div>
  );
};

export default AddItemComponent;
