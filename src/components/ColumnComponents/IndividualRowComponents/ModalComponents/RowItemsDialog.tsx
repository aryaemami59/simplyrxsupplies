import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";

import ModalBodyContent from "./ModalBodyContent";

type Props = {
  hideModal: () => void;
  modalOpen: boolean;
};

const RowItemsDialog: FC<Props> = ({ hideModal, modalOpen }) => (
  <Dialog
    aria-labelledby="contained-modal-title-vcenter"
    fullWidth
    keepMounted
    maxWidth="md"
    onClose={hideModal}
    open={modalOpen}>
    <DialogTitle>Item Details</DialogTitle>
    <DialogContent dividers>
      <ModalBodyContent />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={hideModal}
        variant="contained">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

RowItemsDialog.propTypes = {
  hideModal: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
};

export default memo<Props>(RowItemsDialog);
