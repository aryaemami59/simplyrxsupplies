import { FC, memo } from "react";
import { Row, Col, Container, ListGroup } from "react-bootstrap";
import ModalItemName from "./ModalItemName";
import ModalItemNumber from "./ModalItemNumber";
import { ItemObjType, vendorNameType } from "../../../../../customTypes/types";
import { useAppSelector } from "../../../../../Redux/hooks";
import { selectVendorOfficialName } from "../../../../../Redux/addedSlice";
import ModalBarcodeContainer from "./ModalBarcodeContainer";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const ModalBodyContent: FC<Props> = ({ itemObj, vendorName }): JSX.Element => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  return (
    <Row className="justify-content-center text-center fs-4">
      <Col key={`Col-thirdCol-App`} xs={10} className="justify-content-center">
        <Container
          key={`${itemObj.name}${vendorName}-VendorColumn-Container-name`}>
          <ListGroup>
            <ModalItemName itemObj={itemObj} vendorName={vendorName} />
            <ModalItemNumber itemObj={itemObj} vendorName={vendorName} />
            <ModalBarcodeContainer
              itemObj={itemObj}
              officialVendorName={officialVendorName}
            />
          </ListGroup>
        </Container>
      </Col>
    </Row>
  );
};

export default memo<Props>(ModalBodyContent);
