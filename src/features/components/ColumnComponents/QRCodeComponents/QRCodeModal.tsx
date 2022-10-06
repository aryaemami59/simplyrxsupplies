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
import { DarkMode } from "../../../../App";
import { ItemNumber, Src, vendorNameType } from "../../../../customTypes/types";

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
