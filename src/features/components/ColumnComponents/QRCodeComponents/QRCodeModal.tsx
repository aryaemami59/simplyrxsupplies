import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@mui/material";
import {
  FC,
  memo,
  MouseEventHandler,
  useCallback,
  useContext,
  useState,
} from "react";
import { Modal } from "react-bootstrap";
import { DarkMode } from "../../../../App";
import { ItemNumber, Src, vendorNameType } from "../../../../customTypes/types";

const title = "Click Here to Take a Closer Look at The QRCode";

type Props = {
  src: Src;
  vendorName: vendorNameType;
  itemNumbers: ItemNumber;
};

const QRCodeModal: FC<Props> = ({
  src,
  vendorName,
  itemNumbers,
}): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShow(true);
  }, []);

  const hideModal = useCallback(() => {
    setShow(false);
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
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          variant="contained"
          onClick={showModal}
          startIcon={<FontAwesomeIcon icon={faMagnifyingGlassPlus} />}
          className="w-auto">
          Magnify
        </Button>
      </Tooltip>
      <Modal
        show={show}
        onHide={hideModal}>
        <Modal.Header
          className={darkTheme ? "bg-dark" : "bg-light"}
          closeButton
          closeVariant={darkTheme ? "white" : "none"}></Modal.Header>
        <Modal.Body
          className={`d-flex justify-content-center align-items-center ${
            darkTheme ? "bg-dark" : "bg-light"
          }`}>
          <img
            src={src}
            className="w-100"
            alt={`${vendorName}-QRCode`}
            key={`${vendorName}-QRCode-image-QRCodeImageComponent`}
            title={itemNumbers}
          />
        </Modal.Body>
        <Modal.Footer className={darkTheme ? "bg-dark text-info" : "bg-light"}>
          <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo<Props>(QRCodeModal);
