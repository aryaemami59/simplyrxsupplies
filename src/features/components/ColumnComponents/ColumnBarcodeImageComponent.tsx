import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { FC, memo, useCallback, useContext, useState } from "react";
import PrintIconBarcodeComponent from "./PrintIconBarcodeComponent";
import { itemInterface, selectVendorOfficialName } from "../../../addedSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { DarkMode } from "../../../App";
import { useAppSelector, RootState } from "../../../data/store";

interface Props {
  itemObj: itemInterface;
  vendorName: string;
}

const ColumnBarcodeImageComponent: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  const itemBarcodeShown = useAppSelector(
    (state: RootState) => state.added.showItemBarcode
  );
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
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
      {itemBarcodeShown ? (
        <Container fluid className="my-4">
          <Row>
            <Col md={12} className="position-relative">
              <Row className="justify-content-center">
                <PrintIconBarcodeComponent
                  itemObj={itemObj}
                  text={"Print This Barcode"}
                  header={`<h2>Item Name: </h2><h1>${itemObj.name}</h1><h2>Item Number: </h2><h1>${itemObj.itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`}
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlassPlus}
                  size="lg"
                  className="btn w-auto"
                  inverse={darkTheme ? true : false}
                  role="button"
                  onClick={showModal}
                />
              </Row>
              <Row className="justify-content-center">
                <img
                  src={itemObj.src}
                  alt={itemObj.itemNumber}
                  className="custom-shadow my-4 w-auto p-0"
                />
              </Row>
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
      ) : (
        ""
      )}
    </>
  );
};

export default memo(ColumnBarcodeImageComponent);
