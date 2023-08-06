import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
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
        enterDelay={500}
        enterNextDelay={500}
        onClose={hideTooltip}
        onOpen={showTooltip}
        open={open}
        title={title}>
        <IconButton
          className="d-inline-block w-auto"
          onClick={showModal}
          size="small">
          {startIcon}
        </IconButton>
      </Tooltip>
      <RowBarcodeDialog
        hideModal={hideModal}
        show={show}
      />
    </>
  );
};

export default memo(RowBarcodeModal);
