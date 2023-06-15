import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
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
        onOpen={showTooltip}
        onClose={hideTooltip}
        enterDelay={500}
        enterNextDelay={500}
        title={title}
        open={open}>
        <IconButton
          size="small"
          onClick={showModal}
          className="d-inline-block w-auto">
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
