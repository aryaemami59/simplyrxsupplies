import { CardContent, List } from "@mui/material";
import { FC, memo } from "react";
import {
  ItemName,
  OfficialVendorNameType,
  VendorNameType,
} from "../../../customTypes/types";
import RowSingleContainer from "./IndividualRowComponents/RowSingleContainer";
import QRCodeImageContainer from "./QRCodeComponents/QRCodeImageContainer";
import VendorLink from "./VendorLink";

type Props = {
  addedItems: ItemName[];
  vendorName: VendorNameType;
  officialVendorName: OfficialVendorNameType;
};

const ColumnTopCardBody: FC<Props> = ({
  addedItems,
  officialVendorName,
  vendorName,
}) => (
  <CardContent>
    <QRCodeImageContainer vendorName={vendorName} />
    <VendorLink
      officialVendorName={officialVendorName}
      vendorName={vendorName}
    />
    {/* <ColumnHideButtons /> */}
    <List>
      {addedItems.map(itemName => (
        <RowSingleContainer
          key={`${itemName}-${vendorName}-SingleVendorColumnListItem`}
          {...{ itemName, vendorName }}
        />
      ))}
    </List>
  </CardContent>
);

export default memo<Props>(ColumnTopCardBody);
