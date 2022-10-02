import { FC, memo } from "react";
import { ButtonGroup, Card, ListGroup } from "react-bootstrap";
import {
  ItemObjType,
  officialVendorNameType,
  vendorNameType,
} from "../../../customTypes/types";
import RowSingleContainer from "./IndividualRowComponents/RowSingleContainer";
import QRCodeImage from "./QRCodeComponents/QRCodeImage";
import ColumnToggleItemBarcodesButton from "./ToggleComponents/ColumnToggleItemBarcodesButton";
import ColumnToggleItemNumbersButton from "./ToggleComponents/ColumnToggleItemNumbersButton";
import ColumnToggleNamesButton from "./ToggleComponents/ColumnToggleNamesButton";
import VendorLink from "./VendorLink";

type Props = {
  addedItems: ItemObjType[];
  vendorName: vendorNameType;
  officialVendorName: officialVendorNameType;
};

const ColumnTopCardBody: FC<Props> = ({
  addedItems,
  officialVendorName,
  vendorName,
}): JSX.Element => {
  return (
    <>
      <Card.Body key={`Card.Body-VendorColumn-${vendorName}`}>
        <QRCodeImage
          vendorName={vendorName}
          key={`${vendorName}-VendorColumn-QRCodeImageComponent`}
        />
        <VendorLink
          officialVendorName={officialVendorName}
          vendorName={vendorName}
        />
        <ButtonGroup className="mb-3">
          <ColumnToggleNamesButton />
          <ColumnToggleItemNumbersButton />
          <ColumnToggleItemBarcodesButton />
        </ButtonGroup>
        <ListGroup key={`ListGroup-VendorColumn-${vendorName}`}>
          {addedItems.map(itemObj => (
            <RowSingleContainer
              key={`${itemObj.id}-${vendorName}-SingleVendorColumnListItem`}
              {...{ itemObj, vendorName }}
            />
          ))}
        </ListGroup>
      </Card.Body>
    </>
  );
};

export default memo<Props>(ColumnTopCardBody);
