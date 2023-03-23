import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback, useState } from "react";
import QRCodeDialog from "./QRCodeDialog";

const title = "Take a Closer Look at The QRCode";

const startIcon = <FontAwesomeIcon icon={faMagnifyingGlassPlus} />;

const QRCodeModal: FC = () => {
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
          onClick={showModal}
          size="large"
          className="d-inline-block w-auto">
          {startIcon}
        </IconButton>
        {/* <Button
          size="small"
          variant="contained"
          onClick={showModal}
          startIcon={startIcon}
          className="w-auto">
          Magnify
        </Button> */}
      </Tooltip>
      <QRCodeDialog
        hideModal={hideModal}
        show={show}
      />
    </>
  );
};

export default memo(QRCodeModal);
