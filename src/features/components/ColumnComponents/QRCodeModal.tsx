import {
  FC,
  memo,
  useContext,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  MouseEventHandler,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { DarkMode, myContextInterface } from "../../../App";

interface Props {
  src: string;
  vendorName: string;
  itemNumbers: string;
}

const QRCodeModal: FC<Props> = ({
  src,
  vendorName,
  itemNumbers,
}): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);
  const [show, setShow]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);

  const showModal: MouseEventHandler<SVGSVGElement> = useCallback((): void => {
    setShow(true);
  }, []);

  const hideModal: () => void = useCallback((): void => {
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
