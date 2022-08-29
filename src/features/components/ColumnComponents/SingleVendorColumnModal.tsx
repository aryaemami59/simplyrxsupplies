import { FC, memo, useState, useCallback } from "react";
import { Modal, Row, Col, Container, ListGroup, Button } from "react-bootstrap";
import { itemInterface, selectVendorOfficialName } from "../../../addedSlice";
import CopyIconComponent from "./CopyIconComponent";
import PrintIconBarcodeComponent from "./PrintIconBarcodeComponent";
import { useAppSelector } from "../../../data/store";
import ColumnBarcodeModal from "./ColumnBarcodeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  itemObj: itemInterface;
  vendorName: string;
}

const SingleVendorColumnModal: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = useCallback(() => {
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
          className="bg-dark text-info"
          closeButton
          closeVariant="white">
          <Modal.Title id="contained-modal-title-vcenter">
            Item Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-info">
          <Row className="justify-content-center text-center fs-4">
            <Col
              key={`Col-thirdCol-App`}
              xs={10}
              className="justify-content-center">
              <Container
                key={`${itemObj.name}${vendorName}-VendorColumn-Container-name`}>
                <ListGroup>
                  <ListGroup.Item
                    action
                    className="rounded-top fw-bold"
                    variant="success"
                    key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
                    Item Name: {itemObj.name}
                    <CopyIconComponent
                      key={`${vendorName}-${itemObj.name}-CopyIconComponent-ItemNameComponent`}
                      content={itemObj.name}
                      text={"Name"}
                      placement="top"
                      itemObj={itemObj}
                      vendorName={vendorName}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item
                    variant="primary"
                    className="rounded-bottom fw-bold"
                    action
                    key={`${itemObj.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-itemNumber`}>
                    Item Number: {itemObj.itemNumber}
                    <CopyIconComponent
                      key={`${vendorName}-${itemObj.itemNumber}-CopyIconComponent-ItemNumberComponent`}
                      content={itemObj.itemNumber}
                      text={"Number"}
                      placement="bottom"
                      itemObj={itemObj}
                      vendorName={vendorName}
                    />
                  </ListGroup.Item>
                  <Container fluid className="my-4">
                    <Row>
                      <Col md={12} className="position-relative">
                        <Row className="justify-content-center">
                          <PrintIconBarcodeComponent
                            itemObj={itemObj}
                            text={"Print This Barcode"}
                            header={`<h2>Item Name: </h2><h1>${itemObj.name}</h1><h2>Item Number: </h2><h1>${itemObj.itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`}
                          />
                          <ColumnBarcodeModal itemObj={itemObj} />
                        </Row>
                        <Row className="justify-content-center">
                          <img
                            src={itemObj.src}
                            alt={itemObj.itemNumber}
                            className="custom-shadow my-4 w-auto p-0"
                          />
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </ListGroup>
              </Container>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-info">
          <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(SingleVendorColumnModal);
