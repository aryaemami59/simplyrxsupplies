import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, memo } from "react";
import { Button } from "react-bootstrap";
import BarcodeImage from "../BarcodeImage";
import useItemName from "../../../../customHooks/useItemName";

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

export default memo<Props>(RowBarcodeDialog);
