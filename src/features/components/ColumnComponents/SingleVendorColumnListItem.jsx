import Container from "react-bootstrap/Container";
import RemoveButton from "./RemoveButton";
import ItemNameComponent from "./ItemNameComponent";
import ItemNumberComponent from "./ItemNumberComponent";
import ColumnBarcodeImageComponent from "./ColumnBarcodeImageComponent";
import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Fade } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup } from "react-bootstrap";

function SingleVendorColumnListItem({
  itemObj,
  vendorName,
  officialVendorName,
}) {
  const [open, setOpen] = useState(true);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <div className="">
      <Container fluid className="my-3">
        <Row className="justify-content-evenly align-items-center">
          <Col xs={12} xl={7} xxl={9} className="">
            <Fade in={!open} unmountOnExit={true}>
              <Button
                variant="success"
                size=""
                className="w-100"
                onClick={toggle}>
                {itemObj.name}
              </Button>
            </Fade>
          </Col>
          <Col className="" xs={"auto"}>
            <ButtonGroup className="my-2">
              <FontAwesomeIcon
                icon={faMinus}
                className="btn rounded-circle hover-inverse px-2 me-1"
                size="2xl"
                role="button"
                onClick={toggle}
              />
              <RemoveButton
                vendorName={vendorName}
                itemObj={itemObj}
                key={`${itemObj}-${vendorName}-RemoveButton`}
              />
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      <Collapse in={open}>
        <Container
          className="bg-secondary"
          key={`${itemObj.name}${vendorName}-VendorColumn-Container-name`}>
          <ItemNameComponent
            vendorName={vendorName}
            itemObj={itemObj}
            key={`${itemObj.name}-${vendorName}-ItemNameComponent`}
          />
          <ItemNumberComponent
            vendorName={vendorName}
            itemObj={itemObj}
            key={`${itemObj.name}-${vendorName}-ItemNumberComponent`}
          />
          <ColumnBarcodeImageComponent
            src={itemObj.src}
            itemNumber={itemObj.itemNumber}
            itemObj={itemObj}
            vendorName={vendorName}
            officialVendorName={officialVendorName}
            key={`${itemObj.name}-${vendorName}-ColumnBarcodeImageComponent`}
          />
        </Container>
      </Collapse>
    </div>
  );
}

PropTypes.propTypes = {
  vendorName: PropTypes.string,
  officialVendorName: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(SingleVendorColumnListItem);
