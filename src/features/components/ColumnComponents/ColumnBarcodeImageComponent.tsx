import { Container, Row, Col } from "react-bootstrap";
import { FC, memo } from "react";
import PrintIconBarcodeComponent from "./PrintIconBarcodeComponent";
import { itemInterface, selectVendorOfficialName } from "../../../addedSlice";
import { useAppSelector, RootState } from "../../../data/store";
import ColumnBarcodeModal from "./ColumnBarcodeModal";

interface Props {
  itemObj: itemInterface;
  vendorName: string;
}

const ColumnBarcodeImageComponent: FC<Props> = ({
  itemObj,
  vendorName,
}): JSX.Element => {
  const itemBarcodeShown: boolean = useAppSelector<boolean>(
    (state: RootState): boolean => state.added.showItemBarcode
  );
  const officialVendorName: string = useAppSelector<string>(
    selectVendorOfficialName(vendorName)
  );

  return (
    <>
      {itemBarcodeShown ? (
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
                  className="my-4 w-auto p-0"
                />
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

export default memo<Props>(ColumnBarcodeImageComponent);
