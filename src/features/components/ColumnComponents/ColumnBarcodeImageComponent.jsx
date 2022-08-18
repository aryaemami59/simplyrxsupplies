import { Container, Row, Col } from "react-bootstrap";
import { memo } from "react";
import PrintIconBarcodeComponent from "./PrintIconBarcodeComponent";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectVendorOfficialName } from "../../../addedSlice";

function ColumnBarcodeImageComponent({ src, itemObj, vendorName }) {
  const officialVendorName = useSelector(selectVendorOfficialName(vendorName));

  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={12}>
          <img src={src} alt={itemObj.itemNumber} className="custom-shadow" />
          <PrintIconBarcodeComponent
            itemObj={itemObj}
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
