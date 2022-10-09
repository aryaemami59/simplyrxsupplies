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
import { ItemNumber, Src, vendorNameType } from "../../../../customTypes/types";
import { selectVendorOfficialName } from "../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../Redux/hooks";
import QRCodeImage from "./QRCodeImage";

const title = "Take a Closer Look at The QRCode";

type Props = {
  // src: Src;
  vendorName: vendorNameType;
  // itemNumbers: ItemNumber;
};

const QRCodeModal: FC<Props> = ({ vendorName }) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const showModal: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShow(true);
  }, []);

  const hideModal = useCallback(() => {
    setShow(false);
  }, []);

  const showTooltip = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Tooltip
        onOpen={showTooltip}
        onClose={hideTooltip}
        enterDelay={1500}
        enterNextDelay={1500}
        title={title}
        open={open}>
        <Button
          variant="contained"
          onClick={showModal}
          startIcon={<FontAwesomeIcon icon={faMagnifyingGlassPlus} />}
          className="w-auto">
          Magnify
        </Button>
      </Tooltip>
      <Dialog
        keepMounted
        maxWidth="md"
        fullWidth
        open={show}
        onClose={hideModal}>
        <DialogTitle>
          QRCode for Items Added to {officialVendorName}
        </DialogTitle>
        <DialogContent
          dividers
          className="justify-content-center d-flex">
          <QRCodeImage
            // src={src}
            // title={itemNumbers}
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
    </>
  );
};

export default memo<Props>(QRCodeModal);
