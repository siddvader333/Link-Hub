import { makeStyles, Modal, Typography } from "@material-ui/core";
import React from "react";

export interface EditLinkModalProps {
  linkTitle: string;
  linkUrl: string;
  modalOpen: boolean;
  handleClose: () => void;
}
const EditLinkModal = (props: EditLinkModalProps) => {
  const useStyles = makeStyles({});
  const classes = useStyles();
  return (
    <div>
      <Modal open={props.modalOpen} onClose={props.handleClose}>
        <Typography> Sup</Typography>
      </Modal>
    </div>
  );
};
export default EditLinkModal;
