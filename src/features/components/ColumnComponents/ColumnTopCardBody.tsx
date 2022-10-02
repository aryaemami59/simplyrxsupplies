import { FC, memo, useEffect } from "react";
import { Card, ButtonGroup, ListGroup } from "react-bootstrap";
import QRCodeImage from "./QRCodeComponents/QRCodeImage";
import ColumnToggleItemBarcodesButton from "./ToggleComponents/ColumnToggleItemBarcodesButton";
import ColumnToggleItemNumbersButton from "./ToggleComponents/ColumnToggleItemNumbersButton";
import ColumnToggleNamesButton from "./ToggleComponents/ColumnToggleNamesButton";
import VendorLink from "./VendorLink";
import {
  ItemObjType,
  vendorNameType,
  officialVendorNameType,
} from "../../../customTypes/types";
import RowSingleContainer from "./IndividualRowComponents/RowSingleContainer";

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
  useEffect(() => {
    console.log(addedItems);
  }, [addedItems]);

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
              itemObj={itemObj}
              vendorName={vendorName}
              key={`${itemObj.name}-${vendorName}-SingleVendorColumnListItem`}
            />
          ))}
        </ListGroup>
      </Card.Body>
    </>
  );
};

export default memo<Props>(ColumnTopCardBody);
