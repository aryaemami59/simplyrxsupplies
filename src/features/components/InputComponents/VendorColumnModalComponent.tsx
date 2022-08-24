import { memo, useCallback, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import VendorColumnList from "../ColumnComponents/VendorColumnList";

function VendorColumnModalComponent() {
  const [show, setShow] = useState(false);

  const showModal = useCallback(() => {
    setShow(true);
  }, []);
  const hideModal = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <Button
        variant="info"
        size="lg"
        onClick={showModal}
        className={`neon-butto my-3 d-inline-block d-md-none w-75 rounded custom-text-shadow-white text-white shadow`}>
        Display Cart
      </Button>
      {/* <button
        type="button"
        onClick={showModal}
        className="neon-button my-3 d-md-none w-75"
        value="Display Cart">
        Display Cart
      </button> */}
      <Modal
        scrollable
        onHide={hideModal}
        show={show}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header
          className="bg-dark text-info"
          closeButton
          closeVariant="white">
          <Modal.Title id="contained-modal-title-vcenter">
            Item Vendors
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-info">
          <Row className="justify-content-center">
            <Col
              key={`Col-thirdCol-App`}
              xs={10}
              className=" justify-content-center">
              <VendorColumnList key={`VendorColumnList-`} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-info">
          <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default memo(VendorColumnModalComponent);
