import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, memo } from "react";
import { VendorAndItemName } from "../../../../../customTypes/types";
import ModalBodyContent from "./ModalBodyContent";

type Props = VendorAndItemName & {
  hideModal: () => void;
  modalOpen: boolean;
};

const RowItemsDialog: FC<Props> = ({
  hideModal,
  itemName,
  modalOpen,
  vendorName,
}) => (
  <Dialog
    keepMounted
    maxWidth="md"
    fullWidth
    onClose={hideModal}
    open={modalOpen}
    aria-labelledby="contained-modal-title-vcenter">
    <DialogTitle>Item Details</DialogTitle>
    <DialogContent dividers>
      <ModalBodyContent
        itemName={itemName}
        vendorName={vendorName}
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

export default memo<Props>(RowItemsDialog);