import { Container, Row, Col } from "react-bootstrap";
import { memo } from "react";
import PrintIconBarcodeComponent from "./PrintIconBarcodeComponent";
import PropTypes from "prop-types";

function ColumnBarcodeImageComponent({ src, itemObj, officialVendorName }) {
  return (
    <Container fluid className="my-4">
      <Row className="">
        <Col md={12} className="">
          <img src={src} alt={itemObj.itemNumber} className="custom-shadow" />
          <PrintIconBarcodeComponent
            itemObj={itemObj}
            officialVendorName={officialVendorName}
            src={src}
            text={"Print This Barcode"}
            header={`<h2>Item Name: </h2><h1>${itemObj.name}</h1><h2>Item Number: </h2><h1>${itemObj.itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`}
          />
        </Col>
      </Row>
    </Container>
  );
}

ColumnBarcodeImageComponent.propTypes = {
  src: PropTypes.string,
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

export default memo(ColumnBarcodeImageComponent);
