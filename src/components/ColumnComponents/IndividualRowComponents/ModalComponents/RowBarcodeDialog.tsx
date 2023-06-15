import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";
import Button from "react-bootstrap/Button";

import useItemName from "../../../../hooks/useItemName";
import BarcodeImage from "../BarcodeImage";

type Props = {
  hideModal: () => void;
  show: boolean;
};

const RowBarcodeDialog: FC<Props> = ({ hideModal, show }) => {
  const itemName = useItemName();

  return (
    <Dialog
      keepMounted
      maxWidth="md"
      fullWidth
      open={show}
      onClose={hideModal}>
      <DialogTitle>{itemName}</DialogTitle>
      <DialogContent
        dividers
        className="justify-content-center d-flex">
        <BarcodeImage className="w-100" />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={hideModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

RowBarcodeDialog.propTypes = {
  hideModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default memo<Props>(RowBarcodeDialog);
