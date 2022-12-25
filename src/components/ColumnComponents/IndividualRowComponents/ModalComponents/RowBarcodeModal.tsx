import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@mui/material";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback, useState } from "react";
import RowBarcodeDialog from "./RowBarcodeDialog";

const title = "Take a Closer Look at The Barcode";

const startIcon = <FontAwesomeIcon icon={faMagnifyingGlassPlus} />;

const RowBarcodeModal: FC = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

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
          startIcon={startIcon}
          onClick={showModal}
          className="w-auto">
          Magnify
        </Button>
      </Tooltip>
      <RowBarcodeDialog
        hideModal={hideModal}
        show={show}
      />
    </>
  );
};

export default memo(RowBarcodeModal);
