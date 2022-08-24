import { memo, useCallback, useContext, useState } from "react";
import QRCode from "qrcode";
import { selectQRCodeContent } from "../../../addedSlice";
import PrintIconQRCodeComponent from "./PrintIconQRCodeComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import { DarkMode } from "../../../App";
import { useAppSelector } from "../../../data/store";
const QRCodeImageComponent = ({ vendorName }) => {
    const itemNumbers = useAppSelector(selectQRCodeContent(vendorName));
    const [show, setShow] = useState(false);
    const { darkTheme } = useContext(DarkMode);
    const showModal = useCallback(() => {
        setShow(true);
    }, []);
    const hideModal = useCallback(() => {
        setShow(false);
    }, []);
    let src = "";
    QRCode.toDataURL(itemNumbers, (err, url) => {
        src = url;
    });
    return (<div key={`${vendorName}-container-QRCodeImageComponent`}>
      <img src={src} className="custom-shadow my-4" alt={`${vendorName}-QRCode`} key={`${vendorName}-QRCode-image-QRCodeImageComponent`} title={itemNumbers}/>
      <PrintIconQRCodeComponent vendorName={vendorName} src={src} text={"Print The QRCode"} key={`${vendorName}-PrintIconQRCodeComponent-QRCodeImageComponent`}/>
      <FontAwesomeIcon icon={faMagnifyingGlassPlus} size="lg" className="btn position-absolute m-3 top-0" inverse={darkTheme ? true : false} role="button" pull="left" onClick={showModal}/>
      <Modal show={show} onHide={hideModal}>
        <Modal.Header className="bg-dark" closeButton closeVariant="white"></Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center bg-dark">
          <img src={src} className="custom-shadow w-100" alt={`${vendorName}-QRCode`} key={`${vendorName}-QRCode-image-QRCodeImageComponent`} title={itemNumbers}/>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-info">
          <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>);
};
export default memo(QRCodeImageComponent);
