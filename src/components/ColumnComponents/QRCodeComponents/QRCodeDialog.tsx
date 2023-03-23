import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";
import useOfficialVendorName from "../../../hooks/useOfficialVendorName";
import useVendorName from "../../../hooks/useVendorName";
import QRCodeImage from "./QRCodeImage";

type Props = {
  hideModal: () => void;
  show: boolean;
};

const QRCodeDialog: FC<Props> = ({ hideModal, show }) => {
  const vendorName = useVendorName();
  const officialVendorName = useOfficialVendorName(vendorName);

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
        <QRCodeImage className="w-75" />
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

QRCodeDialog.propTypes = {
  hideModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default memo<Props>(QRCodeDialog);
