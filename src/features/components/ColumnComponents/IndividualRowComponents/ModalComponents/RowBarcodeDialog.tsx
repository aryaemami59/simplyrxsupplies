import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, memo } from "react";
import { Button } from "react-bootstrap";
import { ItemName } from "../../../../../customTypes/types";
import BarcodeImage from "../BarcodeImage";

type Props = {
  hideModal: () => void;
  itemName: ItemName;
  show: boolean;
};

const RowBarcodeDialog: FC<Props> = ({ hideModal, itemName, show }) => (
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
      <BarcodeImage
        itemName={itemName}
        className="w-100"
      />
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

export default memo<Props>(RowBarcodeDialog);
