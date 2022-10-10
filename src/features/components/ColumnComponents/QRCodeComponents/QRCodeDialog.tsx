import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, memo } from "react";
import {
  OfficialVendorNameType,
  VendorNameType,
} from "../../../../customTypes/types";
import QRCodeImage from "./QRCodeImage";

type Props = {
  hideModal: () => void;
  officialVendorName: OfficialVendorNameType;
  show: boolean;
  vendorName: VendorNameType;
};

const QRCodeDialog: FC<Props> = ({
  hideModal,
  officialVendorName,
  show,
  vendorName,
}) => (
  <Dialog
    // keepMounted
    maxWidth="md"
    fullWidth
    open={show}
    onClose={hideModal}>
    <DialogTitle>QRCode for Items Added to {officialVendorName}</DialogTitle>
    <DialogContent
      dividers
      className="justify-content-center d-flex">
      <QRCodeImage
        vendorName={vendorName}
        className="w-75"
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

export default memo<Props>(QRCodeDialog);
