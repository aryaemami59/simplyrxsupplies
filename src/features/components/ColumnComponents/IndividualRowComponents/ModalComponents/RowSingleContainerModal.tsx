import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { ItemObjType, vendorNameType } from "../../../../../customTypes/types";
import ModalBodyContent from "./ModalBodyContent";

const title = "Take a Closer Look at The Item Info";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const RowSingleContainerModal: FC<Props> = ({ itemObj, vendorName }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setModalOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const showTooltip: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Tooltip
        title={title}
        open={open}>
        <Button
          className="flex-grow-1"
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          onClick={showModal}
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faMagnifyingGlassPlus} />}>
          Magnify
        </Button>
      </Tooltip>
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
    </>
  );
};

export default memo<Props>(RowSingleContainerModal);
