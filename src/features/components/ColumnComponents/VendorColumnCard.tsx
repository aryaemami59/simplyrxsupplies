import { Card } from "@mui/material";
import { FC, memo } from "react";
import {
  ItemName,
  OfficialVendorNameType,
  VendorNameType,
} from "../../../customTypes/types";
import ColumnTopCardBody from "./ColumnTopCardBody";
import EmptyColumn from "./EmptyColumn";

type Props = {
  addedItems: ItemName[];
  vendorName: VendorNameType;
  officialVendorName: OfficialVendorNameType;
};

const VendorColumnCard: FC<Props> = ({
  addedItems,
  officialVendorName,
  vendorName,
}) => (
  <Card>
    {addedItems.length ? (
      <ColumnTopCardBody
        addedItems={addedItems}
        vendorName={vendorName}
        officialVendorName={officialVendorName}
      />
    ) : (
      <EmptyColumn />
    )}
  </Card>
);

export default memo<Props>(VendorColumnCard);
