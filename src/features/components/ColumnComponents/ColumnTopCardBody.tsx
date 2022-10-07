import { FC, memo } from "react";
// import { ButtonGroup, Card, ListGroup } from "react-bootstrap";
import {
  ItemObjType,
  officialVendorNameType,
  vendorNameType,
} from "../../../customTypes/types";
import RowSingleContainer from "./IndividualRowComponents/RowSingleContainer";
import QRCodeImageContainer from "./QRCodeComponents/QRCodeImageContainer";
import ColumnToggleItemBarcodesButton from "./ToggleComponents/ColumnToggleItemBarcodesButton";
import ColumnToggleItemNumbersButton from "./ToggleComponents/ColumnToggleItemNumbersButton";
import ColumnToggleNamesButton from "./ToggleComponents/ColumnToggleNamesButton";
import VendorLink from "./VendorLink";
import { ButtonGroup, CardContent, List } from "@mui/material";

type Props = {
  addedItems: ItemObjType[];
  vendorName: vendorNameType;
  officialVendorName: officialVendorNameType;
};

const ColumnTopCardBody: FC<Props> = ({
  addedItems,
  officialVendorName,
  vendorName,
}) => {
  return (
    <>
      <CardContent key={`Card.Body-VendorColumn-${vendorName}`}>
        <QRCodeImageContainer
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
        <List key={`ListGroup-VendorColumn-${vendorName}`}>
          {addedItems.map(itemObj => (
            <RowSingleContainer
              key={`${itemObj.id}-${vendorName}-SingleVendorColumnListItem`}
              {...{ itemObj, vendorName }}
            />
          ))}
        </List>
      </CardContent>
    </>
  );
};

export default memo<Props>(ColumnTopCardBody);
