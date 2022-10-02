import { FC, memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PrintBarcodeIcon from "../PrintBarcodeIcon";
import RowBarcodeModal from "./RowBarcodeModal";
import {
  ItemObjType,
  officialVendorNameType,
} from "../../../../../customTypes/types";

type Props = {
  itemObj: ItemObjType;
  officialVendorName: officialVendorNameType;
};

const ModalBarcodeContainer: FC<Props> = ({
  itemObj,
  officialVendorName,
}): JSX.Element => {
  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={12} className="position-relative">
          <Row className="justify-content-center">
            <PrintBarcodeIcon
              itemObj={itemObj}
              text={"Print This Barcode"}
              header={`<h2>Item Name: </h2><h1>${itemObj.name}</h1><h2>Item Number: </h2><h1>${itemObj.itemNumber}</h1><h2>You can order this item from ${officialVendorName}</h2>`}
            />
            <RowBarcodeModal itemObj={itemObj} />
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
  );
};

export default memo<Props>(ModalBarcodeContainer);
