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
import { ItemObjType, vendorNameType } from "../../../../../customTypes/types";
import ModalBodyContent from "./ModalBodyContent";

const title = "Click Here to Take a Closer Look at The Item Info";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const RowSingleContainerModal: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);

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
      {/* <IconButton className="rounded-circle px-2 me-1 hover-inverse">
        <ZoomInIcon
        className="rounded-circle px-2 me-1 hover-inverse"
        />
      </IconButton> */}
      {/* <IconButton
        onClick={showModal}
        size="medium">
        <FontAwesomeIcon
          icon={faMagnifyingGlassPlus}
          size="1x"
          role="button"
        />
      </IconButton> */}
      <Tooltip
        title={title}
        open={open}>
        <Button
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          onClick={showModal}
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faMagnifyingGlassPlus} />}>
          Magnify
        </Button>
      </Tooltip>
      <Modal
        scrollable
        onHide={hideModal}
        show={modalOpen}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header
          className={darkTheme ? "bg-dark text-info" : "bg-light"}
          closeButton
          closeVariant={darkTheme ? "white" : "none"}>
          <Modal.Title id="contained-modal-title-vcenter">
            Item Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkTheme ? "bg-dark text-info" : "bg-light"}>
          <ModalBodyContent
            itemObj={itemObj}
            vendorName={vendorName}
          />
        </Modal.Body>
        <Modal.Footer className={darkTheme ? "bg-dark" : "bg-light"}>
          <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo<Props>(RowSingleContainerModal);
