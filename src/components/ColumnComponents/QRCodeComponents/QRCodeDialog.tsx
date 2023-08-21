import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";

import useOfficialVendorName from "../../../hooks/useOfficialVendorName";
import useVendorId from "../../../hooks/useVendorId";
import QRCodeImage from "./QRCodeImage";

type Props = {
  hideModal: () => void;
  show: boolean;
};

const QRCodeDialog: FC<Props> = ({ hideModal, show }) => {
  const vendorId = useVendorId();
  const officialVendorName = useOfficialVendorName(vendorId);

  return (
    <Dialog
      fullWidth
      keepMounted
      maxWidth="md"
      onClose={hideModal}
      open={show}>
      <DialogTitle>QRCode for Items Added to {officialVendorName}</DialogTitle>
      <DialogContent
        className="justify-content-center d-flex"
        dividers>
        <QRCodeImage className="w-75" />
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
};

QRCodeDialog.propTypes = {
  hideModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default memo<Props>(QRCodeDialog);
