import {
  FC,
  memo,
  useState,
  useCallback,
  useContext,
  MouseEventHandler,
} from "react";
import { Modal, Row, Col, Container, ListGroup, Button } from "react-bootstrap";
import { selectVendorOfficialName } from "../../../Redux/addedSlice";
import CopyIconComponent from "./CopyIconComponent";
import PrintIconBarcodeComponent from "./PrintIconBarcodeComponent";
import ColumnBarcodeModal from "./ColumnBarcodeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { DarkMode, myContextInterface } from "../../../App";
import { ItemObjType, vendorNameType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const SingleVendorColumnModal: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
        <Modal.Footer className={darkTheme ? "bg-dark" : "bg-light"}>
          <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo<Props>(SingleVendorColumnModal);
