import { Collapse, Button, Row, Col, Fade, ButtonGroup, Container, Modal, ListGroup, } from "react-bootstrap";
import { memo, useCallback, useState } from "react";
import RemoveButton from "./RemoveButton";
import ItemNameComponent from "./ItemNameComponent";
import ItemNumberComponent from "./ItemNumberComponent";
import ColumnBarcodeImageComponent from "./ColumnBarcodeImageComponent";
import MinimizeButton from "./MinimizeButton";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../../data/store";
const SingleVendorColumnListItem = ({ itemObj, vendorName, }) => {
    const [open, setOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const itemNameShown = useAppSelector((state) => state.added.showItemName);
    const itemNumberShown = useAppSelector((state) => state.added.showItemNumber);
    const itemBarcodeShown = useAppSelector((state) => state.added.showItemBarcode);
    const showModal = useCallback(() => {
        setModalOpen(true);
    }, []);
    const hideModal = useCallback(() => {
        setModalOpen(false);
    }, []);
    const toggle = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);
    const handleKeyDown = useCallback((e) => {
        if (e.key === "c") {
            toggle();
        }
    }, [toggle]);
    return (<div key={`div-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`} tabIndex={0} onKeyDown={handleKeyDown} className="rounded shadow border mb-4 shadow">
      <Container key={`Container-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`} fluid className="my-3">
        <Row key={`Row-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`} className="justify-content-evenly align-items-center">
          <Col key={`Col-SingleVendorColumnListItem-${vendorName}-${itemObj.name}-first`} xs={12} xl={7} xxl={9} className="">
            <Fade key={`Fade-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`} in={!open} unmountOnExit>
              <Button key={`Button-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`} aria-controls="maximize content" variant="success" className="w-100" onClick={toggle}>
                {itemObj.name}
              </Button>
            </Fade>
          </Col>
          <Col key={`Col-SingleVendorColumnListItem-${vendorName}-${itemObj.name}-second`} className="" xs={"auto"}>
            <ButtonGroup key={`ButtonGroup-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`} className="my-2">
              <FontAwesomeIcon onClick={showModal} icon={faMagnifyingGlassPlus} inverse className="btn rounded-circle px-2 me-1 hover-inverse" size="2x" role="button"/>
              <Modal scrollable onHide={hideModal} show={modalOpen} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="bg-dark text-info" closeButton closeVariant="white">
                  <Modal.Title id="contained-modal-title-vcenter">
                    Item Details
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-info">
                  <Row className="justify-content-center text-center fs-4">
                    <Col key={`Col-thirdCol-App`} xs={10} className="justify-content-center">
                      <Container key={`${itemObj.name}${vendorName}-VendorColumn-Container-name`}>
                        <ListGroup>
                          <ItemNameComponent vendorName={vendorName} itemObj={itemObj} key={`${itemObj.name}-${vendorName}-ItemNameComponent`}/>
                          <ItemNumberComponent vendorName={vendorName} itemObj={itemObj} key={`${itemObj.name}-${vendorName}-ItemNumberComponent`}/>
                          <ColumnBarcodeImageComponent 
    // className="w-125 h-100"
    itemObj={itemObj} vendorName={vendorName} key={`${itemObj.name}-${vendorName}-ColumnBarcodeImageComponent`}/>
                        </ListGroup>
                      </Container>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer className="bg-dark text-info">
                  <Button onClick={hideModal}>Close</Button>
                </Modal.Footer>
              </Modal>
              <MinimizeButton key={`MinimizeButton-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`} open={open} toggle={toggle} vendorName={vendorName} itemObj={itemObj}/>
              <RemoveButton vendorName={vendorName} itemObj={itemObj} key={`RemoveButton-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`}/>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      <Collapse key={`Collapse-SingleVendorColumnListItem-${vendorName}-${itemObj.name}`} in={open}>
        <Container 
    // className={"custom-bg-color-2"}
    key={`${itemObj.name}${vendorName}-VendorColumn-Container-name`}>
          {itemNameShown ? (<ItemNameComponent vendorName={vendorName} itemObj={itemObj} key={`${itemObj.name}-${vendorName}-ItemNameComponent`}/>) : ("")}
          {itemNumberShown ? (<ItemNumberComponent vendorName={vendorName} itemObj={itemObj} key={`${itemObj.name}-${vendorName}-ItemNumberComponent`}/>) : ("")}
          {itemBarcodeShown ? (<ColumnBarcodeImageComponent itemObj={itemObj} vendorName={vendorName} key={`${itemObj.name}-${vendorName}-ColumnBarcodeImageComponent`}/>) : ("")}
        </Container>
      </Collapse>
    </div>);
};
export default memo(SingleVendorColumnListItem);
