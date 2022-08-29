import { FC, memo, useState, useContext, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { itemInterface } from "../../../addedSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DarkMode } from "../../../App";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  itemObj: itemInterface;
}

const ColumnBarcodeModal: FC<Props> = ({ itemObj }): JSX.Element => {
  const [show, setShow] = useState(false);
  const { darkTheme } = useContext(DarkMode);

  const showModal = useCallback(() => {
    setShow(true);
  }, []);

  const hideModal = useCallback(() => {
    setShow(false);
  }, []);
  return (
    <>
      <FontAwesomeIcon
        icon={faMagnifyingGlassPlus}
        size="lg"
        className="btn w-auto"
        inverse={darkTheme ? true : false}
        role="button"
        onClick={showModal}
      />
      <Modal show={show} onHide={hideModal}>
        <Modal.Header
          className="bg-dark"
          closeButton
          closeVariant="white"></Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center bg-dark">
          <img
            src={itemObj.src}
            alt={itemObj.itemNumber}
            className="custom-shadow w-100"
          />
        </Modal.Body>
        <Modal.Footer className="bg-dark text-info">
          <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(ColumnBarcodeModal);
