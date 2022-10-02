import {
  FC,
  memo,
  useState,
  useCallback,
  useContext,
  MouseEventHandler,
} from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { DarkMode, myContextInterface } from "../../../../../App";
import { ItemObjType, vendorNameType } from "../../../../../customTypes/types";
import ModalBodyContent from "./ModalBodyContent";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const RowSingleContainerModal: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);

  const [modalOpen, setModalOpen] = useState(false);

  const showModal: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    setModalOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <FontAwesomeIcon
        onClick={showModal}
        icon={faMagnifyingGlassPlus}
        inverse
        className="btn rounded-circle px-2 me-1 hover-inverse"
        size="2x"
        role="button"
      />
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
          <ModalBodyContent itemObj={itemObj} vendorName={vendorName} />
        </Modal.Body>
        <Modal.Footer className={darkTheme ? "bg-dark" : "bg-light"}>
          <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo<Props>(RowSingleContainerModal);
