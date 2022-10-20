import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, memo } from "react";
import { VendorNameType } from "../../../../customTypes/types";
import { useAppSelector } from "../../../../Redux/hooks";
import { selectVendorOfficialName } from "../../../../Redux/selectors";
import QRCodeImage from "./QRCodeImage";

type Props = {
  hideModal: () => void;
  show: boolean;
  vendorName: VendorNameType;
};

const QRCodeDialog: FC<Props> = ({ hideModal, show, vendorName }) => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  return (
    <Dialog
      keepMounted
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
};

export default memo<Props>(QRCodeDialog);
