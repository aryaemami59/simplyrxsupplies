import { memo, useCallback, useContext, useState, FC } from "react";
import QRCode from "qrcode";
import { selectQRCodeContent } from "../../../addedSlice";
import PrintIconQRCodeComponent from "./PrintIconQRCodeComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { DarkMode } from "../../../App";
import { useAppSelector } from "../../../data/store";

interface Props {
  vendorName: string;
}

const QRCodeImageComponent: FC<Props> = ({ vendorName }): JSX.Element => {
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

  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={12} className="position-relative">
          <Row className="justify-content-center">
            <PrintIconQRCodeComponent
              vendorName={vendorName}
              src={src}
              text={"Print The QRCode"}
              key={`${vendorName}-PrintIconQRCodeComponent-QRCodeImageComponent`}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlassPlus}
              size="lg"
              className="btn w-auto"
              inverse={darkTheme ? true : false}
              role="button"
              // pull="left"
              onClick={showModal}
            />
          </Row>
          <Row className="justify-content-center">
            <img
              src={src}
              className="custom-shadow my-4 w-auto p-0"
              alt={`${vendorName}-QRCode`}
              key={`${vendorName}-QRCode-image-QRCodeImageComponent`}
              title={itemNumbers}
            />
          </Row>
          <Modal show={show} onHide={hideModal}>
            <Modal.Header
              className="bg-dark"
              closeButton
              closeVariant="white"></Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center bg-dark">
              <img
                src={src}
                className="custom-shadow w-100"
                alt={`${vendorName}-QRCode`}
                key={`${vendorName}-QRCode-image-QRCodeImageComponent`}
                title={itemNumbers}
              />
            </Modal.Body>
            <Modal.Footer className="bg-dark text-info">
              <Button onClick={hideModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(QRCodeImageComponent);
