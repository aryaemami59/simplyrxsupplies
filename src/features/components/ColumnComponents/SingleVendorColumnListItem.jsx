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
// import { faWindowMinimize } from "@fortawesome/free-regular-svg-icons";
// import { faWindowMinimize } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

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
    <div>
      <Row className="justify-content-start pe-3">
        <Col xs={10} xxl={8} className="">
          <Fade in={!open} unmountOnExit={true}>
            <Button
              variant="success"
              size=""
              className="w-100 fs-5"
              onClick={toggle}>
              {itemObj.name}
            </Button>
          </Fade>
        </Col>
        <Col
          className=""
          xs={{
            span: 1,
          }}
          xxl={2}>
          <FontAwesomeIcon
            icon={faMinus}
            className="btn rounded-circle hover-inverse px-2"
            size="2x"
            role="button"
            onClick={toggle}
          />
        </Col>
        <Col
          className=""
          xs={{
            span: 1,
          }}
          xxl={2}>
          <RemoveButton
            vendorName={vendorName}
            itemObj={itemObj}
            key={`${itemObj}-${vendorName}-RemoveButton`}
          />
        </Col>
      </Row>
      <Collapse in={open}>
        <Container
          className="bg-secondary p-0"
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
