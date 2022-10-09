import { CardContent, List } from "@mui/material";
import { FC, memo } from "react";
import {
  ItemObjType,
  officialVendorNameType,
  vendorNameType,
} from "../../../customTypes/types";
import ColumnHideButtons from "./ColumnHideButtons";
import RowSingleContainer from "./IndividualRowComponents/RowSingleContainer";
import QRCodeImageContainer from "./QRCodeComponents/QRCodeImageContainer";
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
}) => (
  <CardContent>
    <QRCodeImageContainer vendorName={vendorName} />
    <VendorLink
      officialVendorName={officialVendorName}
      vendorName={vendorName}
    />
    {/* <ColumnHideButtons /> */}
    <List>
      {addedItems.map(itemObj => (
        <RowSingleContainer
          key={`${itemObj.id}-${vendorName}-SingleVendorColumnListItem`}
          {...{ itemObj, vendorName }}
        />
      ))}
    </List>
  </CardContent>
);

export default memo<Props>(ColumnTopCardBody);
