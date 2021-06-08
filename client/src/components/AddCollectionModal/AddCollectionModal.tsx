import {
  makeStyles,
  Modal,
  useTheme,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import addCollection from "../../slices/collection-slice/thunks/addCollections";
import StyledButton from "../common/StyledButton";
import StyledTextInput from "../common/StyledTextInput";

export interface AddCollectionModalProps {
  modalOpen: boolean;
  handleClose: () => void;
}

const AddCollectionModal = (props: AddCollectionModalProps) => {
  const [newCollectionTitle, setNewCollectionTitle] = React.useState("");
  const darkMode = useAppSelector((state) => state.darkMode.status);
  const accessToken = useAppSelector((state) => state.auth.authData.token);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const useStyles = makeStyles({
    modalDiv: {
      outline: "none",
      width: "30%",
      marginLeft: "35%",
      marginTop: "10vh",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        marginLeft: "10%",
      },
    },
    paper: {
      background: darkMode
        ? "linear-gradient(45deg, #3bba9c 30%, #707793 90%)"
        : "linear-gradient(45deg, #3bba9c 30%, #707793 90%)",
      opacity: 0.9,
      color: "#EEEEEE",
    },
    paper2: {
      height: "25vh",
      paddingTop: "1vh",
      opacity: 1.0,
    },
    tab: {
      color: darkMode ? "white" : "#EEEEEE",
      opacity: 1.0,
      textTransform: "none",
      "&:focus": {
        color: darkMode ? "white" : "#EEEEEE",
        opacity: 1.0,
      },
      "&:hover": {
        color: darkMode ? "#white" : "#EEEEEE",
        opacity: 1.0,
      },
    },
  });
  const classes = useStyles();
  return (
    <div>
      <Modal open={props.modalOpen} onClose={props.handleClose}>
        <div className={classes.modalDiv}>
          <Paper className={classes.paper} square>
            <Tabs
              centered
              value={0}
              textColor="primary"
              aria-label="disabled tabs example"
              indicatorColor="primary"
            >
              <Tab className={classes.tab} label="Add Collection" />
            </Tabs>
          </Paper>
          <Paper className={classes.paper2} square>
            <StyledTextInput
              onChange={(event: any) => {
                setNewCollectionTitle(event.target.value);
              }}
              label="New Collection Title"
            />
            <StyledButton
              onClick={() => {
                dispatch(
                  addCollection({
                    collectionTitle: newCollectionTitle,
                    accessToken: accessToken,
                  })
                );
                props.handleClose();
              }}
              text="Confirm"
            />
          </Paper>
        </div>
      </Modal>
    </div>
  );
};
export default AddCollectionModal;
