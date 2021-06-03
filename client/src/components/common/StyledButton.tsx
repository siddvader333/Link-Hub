import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useAppSelector } from "../../app/hooks";

export interface StyledButtonProps {
  text: string;
  onClick?: () => any;
}
const StyledButton = (props: StyledButtonProps) => {
  const darkMode = useAppSelector((state) => state.darkMode.status);
  const useStyles = makeStyles({
    styledButton: {
      width: "50%",
      margin: "4.5vh 25% 3.5vh 25%",
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
          ? "linear-gradient(45deg, #3bba9c 30%, #707793 90%)"
          : "linear-gradient(45deg, #3bba9c 30%, #707793 90%)",
        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
        color: "#fff",
        transform: "translateY(-15%)",
        border: "none",
        opacity: 1.0,
      },
    },
  });

  const classes = useStyles();

  return (
    <Button className={classes.styledButton} onClick={props.onClick}>
      {props.text}
    </Button>
  );
};

export default StyledButton;
