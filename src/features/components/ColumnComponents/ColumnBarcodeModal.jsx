import { memo, useState, useContext, useCallback, } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DarkMode } from "../../../App";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
const ColumnBarcodeModal = ({ itemObj }) => {
    const [show, setShow] = useState(false);
    const { darkTheme } = useContext(DarkMode);
    const showModal = useCallback(() => {
        setShow(true);
    }, []);
    const hideModal = useCallback(() => {
        setShow(false);
    }, []);
    return (<>
      <FontAwesomeIcon icon={faMagnifyingGlassPlus} size="lg" className="btn w-auto" inverse={darkTheme ? true : false} role="button" onClick={showModal}/>
      <Modal show={show} onHide={hideModal}>
        <Modal.Header className={darkTheme ? "bg-dark" : "bg-light"} closeButton closeVariant={darkTheme ? "white" : ""}></Modal.Header>
        <Modal.Body className={`d-flex justify-content-center align-items-center ${darkTheme ? "bg-dark" : "bg-light"}`}>
          <img src={itemObj.src} alt={itemObj.itemNumber} className="w-100"/>
        </Modal.Body>
        <Modal.Footer className={darkTheme ? "bg-dark" : "bg-light"}>
          <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>);
};
export default memo(ColumnBarcodeModal);
