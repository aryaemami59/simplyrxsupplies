import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton, Tooltip } from "@mui/material";
import {
  FC,
  memo,
  MouseEventHandler,
  useCallback,
  useContext,
  useState,
} from "react";
import { Modal } from "react-bootstrap";
import { DarkMode } from "../../../../../App";
import { ItemObjType } from "../../../../../customTypes/types";

const title = "Click Here to Take a Closer Look at The Barcode";

type Props = {
  itemObj: ItemObjType;
};

const RowBarcodeModal: FC<Props> = ({ itemObj }): JSX.Element => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const { darkTheme } = useContext(DarkMode);

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
          startIcon={<FontAwesomeIcon icon={faMagnifyingGlassPlus} />}
          onClick={showModal}
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
          closeVariant={darkTheme ? "white" : ""}></Modal.Header>
        <Modal.Body
          className={`d-flex justify-content-center align-items-center ${
            darkTheme ? "bg-dark" : "bg-light"
          }`}>
          <img
            src={itemObj.src}
            alt={itemObj.itemNumber}
            className="w-100"
          />
        </Modal.Body>
        <Modal.Footer className={darkTheme ? "bg-dark" : "bg-light"}>
          <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo<Props>(RowBarcodeModal);
