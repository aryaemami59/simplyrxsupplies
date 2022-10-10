import { Card } from "@mui/material";
import { FC, KeyboardEvent, memo } from "react";
import ColumnTopCardBody from "./ColumnTopCardBody";
import EmptyColumn from "./EmptyColumn";
import {
  ItemObjType,
  VendorNameType,
  OfficialVendorNameType,
} from "../../../customTypes/types";

type Props = {
  handleKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  addedItems: ItemObjType[];
  vendorName: VendorNameType;
  officialVendorName: OfficialVendorNameType;
};

const VendorColumnCard: FC<Props> = ({
  addedItems,
  handleKeyDown,
  officialVendorName,
  vendorName,
}) => (
  <Card
    tabIndex={0}
    onKeyDown={handleKeyDown}>
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
