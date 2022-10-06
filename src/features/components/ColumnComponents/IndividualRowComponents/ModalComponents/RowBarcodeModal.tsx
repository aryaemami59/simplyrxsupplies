import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton } from "@mui/material";
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

type Props = {
  itemObj: ItemObjType;
};

const RowBarcodeModal: FC<Props> = ({ itemObj }): JSX.Element => {
  const [show, setShow] = useState(false);
  const { darkTheme } = useContext(DarkMode);

  const showModal: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    setShow(true);
  }, []);

  const hideModal = useCallback(() => {
    setShow(false);
  }, []);
  return (
    <>
      <IconButton className="d-block w-auto">
        <FontAwesomeIcon
          icon={faMagnifyingGlassPlus}
          size="1x"
          // className="btn w-auto"
          // inverse={darkTheme ? true : false}
          role="button"
          onClick={showModal}
        />
      </IconButton>
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
