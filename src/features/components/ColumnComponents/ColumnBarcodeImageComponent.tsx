import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { FC, memo, useCallback, useContext, useState } from "react";
import PrintIconBarcodeComponent from "./PrintIconBarcodeComponent";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { itemInterface, selectVendorOfficialName } from "../../../addedSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { DarkMode } from "../../../App";

interface Props {
  itemObj: itemInterface;
  vendorName: string;
}

const ColumnBarcodeImageComponent: FC<Props> = ({ itemObj, vendorName }) => {
  const officialVendorName = useSelector(selectVendorOfficialName(vendorName));
  const [show, setShow] = useState(false);
  const { darkTheme } = useContext(DarkMode);

  const showModal = useCallback(() => {
    setShow(true);
  }, []);

  const hideModal = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={12} className="position-relative">
          <img
            src={itemObj.src}
            alt={itemObj.itemNumber}
            className="custom-shadow my-4"
          />
          <PrintIconBarcodeComponent
            itemObj={itemObj}
            src={itemObj.src}
            text={"Print This Barcode"}
            header={`<h2>Item Name: </h2><h1>${itemObj.name}</h1><h2>Item Number: </h2><h1>${itemObj.itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlassPlus}
            size="lg"
            className="btn position-absolute m-3 top-0 my-0"
            inverse={darkTheme ? true : false}
            role="button"
            pull="left"
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
        </Col>
      </Row>
    </Container>
  );
};

// ColumnBarcodeImageComponent.propTypes = {
//   vendorName: PropTypes.string,
//   itemObj: PropTypes.shape({
//     name: PropTypes.string,
//     itemNumber: PropTypes.string,
//     keywords: PropTypes.arrayOf(PropTypes.string),
//     nav: PropTypes.arrayOf(PropTypes.string),
//     vendors: PropTypes.arrayOf(PropTypes.string),
//     src: PropTypes.string,
//   }),
// };

export default memo(ColumnBarcodeImageComponent);
