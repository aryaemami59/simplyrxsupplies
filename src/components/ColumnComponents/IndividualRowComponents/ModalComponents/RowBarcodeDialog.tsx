import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";
import Button from "react-bootstrap/Button";

import useItemId from "../../../../hooks/useItemId";
import { useAppSelector } from "../../../../redux/hooks";
import { selectItemName } from "../../../../redux/selectors";
import BarcodeImage from "../BarcodeImage";

type Props = {
  hideModal: () => void;
  show: boolean;
};

const RowBarcodeDialog: FC<Props> = ({ hideModal, show }) => {
  const itemId = useItemId();
  const itemName = useAppSelector(state => selectItemName(state, itemId));

  return (
    <Dialog
      fullWidth
      keepMounted
      maxWidth="md"
      onClose={hideModal}
      open={show}>
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
  show: PropTypes.bool.isRequired,
};

export default memo<Props>(RowBarcodeDialog);
