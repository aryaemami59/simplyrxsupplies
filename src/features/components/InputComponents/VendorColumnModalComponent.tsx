import {
  memo,
  useCallback,
  useState,
  useContext,
  FC,
  MouseEventHandler,
} from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import VendorColumnList from "../ColumnComponents/VendorColumnList";
import { DarkMode, myContextInterface } from "../../../App";

const VendorColumnModalComponent: FC = (): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);
  const [show, setShow] = useState<boolean>(false);

  const showModal: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
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
        className={`my-3 d-inline-block d-md-none w-75 rounded custom-text-shadow-white text-white shadow`}>
        Display Cart
      </Button>
      <Modal
        scrollable
        onHide={hideModal}
        show={show}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header
          className={darkTheme ? "bg-dark text-info" : "bg-light text-dark"}
          closeButton
          closeVariant="white">
          <Modal.Title id="contained-modal-title-vcenter">
            Item Vendors
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={darkTheme ? "bg-dark text-info" : "bg-light text-dark"}>
          <Row className="justify-content-center">
            <Col
              key={`Col-thirdCol-App`}
              xs={10}
              className=" justify-content-center">
              <VendorColumnList key={`VendorColumnList-`} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer
          className={darkTheme ? "bg-dark text-info" : "bg-light text-dark"}>
          <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(VendorColumnModalComponent);
