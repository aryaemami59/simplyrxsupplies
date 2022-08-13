import { memo, useEffect } from "react";
import PrintIconBarcodeComponent from "./PrintIconBarcodeComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { LazyLoadImage } from "react-lazy-load-image-component";

function ColumnBarcodeImageComponent({
  src,
  itemNumber,
  itemObj,
  officialVendorName,
}) {
  useEffect(() => {
    // console.log("ColumnBarcodeImageComponent mounts");
    // return () => console.log("ColumnBarcodeImageComponent unmounts");
  }, []);

  // return <LazyLoadImage src={src} alt={itemNumber} />;
  return (
    <Container fluid className="my-4">
      <Row className="">
        <Col md={12} className="">
          <img src={src} alt={itemNumber} className="custom-shadow" />
          <PrintIconBarcodeComponent itemObj={itemObj} officialVendorName={officialVendorName}
            src={src}
            text={"Print This Barcode"}
            header={`<h2>Item Name: </h2><h1>${itemObj.name}</h1><h2>Item Number: </h2><h1>${itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`}
          />
        </Col>
        {/* <Col md={2} className="bg-danger p-0 m-0"> */}
        {/* </Col> */}
      </Row>
    </Container>
  );
}

export default memo(ColumnBarcodeImageComponent);
