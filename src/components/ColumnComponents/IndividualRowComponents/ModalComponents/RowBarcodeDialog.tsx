import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";
import Button from "react-bootstrap/Button";

import useItemId from "../../../../hooks/useItemId";
import { useItemName } from "../../../../redux/selectors";
import BarcodeImage from "../BarcodeImage";

type Props = {
  hideModal: () => void;
  isModalOpen: boolean;
};

const RowBarcodeDialog: FC<Props> = ({ hideModal, isModalOpen }) => {
  const itemId = useItemId();
  const itemName = useItemName(itemId);

  return (
    <Dialog
      fullWidth
      keepMounted
      maxWidth="md"
      onClose={hideModal}
      open={isModalOpen}>
      <DialogTitle>{itemName}</DialogTitle>
      <DialogContent
        className="justify-content-center d-flex"
        dividers>
        <BarcodeImage className="w-100" />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={hideModal}
          variant="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

RowBarcodeDialog.propTypes = {
  hideModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

export default memo<Props>(RowBarcodeDialog);
