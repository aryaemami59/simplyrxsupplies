import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, memo } from "react";
import { ItemObjType, VendorNameType } from "../../../../../customTypes/types";
import ModalBodyContent from "./ModalBodyContent";

type Props = {
  hideModal: () => void;
  itemObj: ItemObjType;
  modalOpen: boolean;
  vendorName: VendorNameType;
};

const RowItemsDialog: FC<Props> = ({
  hideModal,
  itemObj,
  modalOpen,
  vendorName,
}) => (
  <Dialog
    // keepMounted
    maxWidth="md"
    fullWidth
    onClose={hideModal}
    open={modalOpen}
    aria-labelledby="contained-modal-title-vcenter">
    <DialogTitle>Item Details</DialogTitle>
    <DialogContent dividers>
      <ModalBodyContent
        itemObj={itemObj}
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
