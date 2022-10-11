import { List } from "@mui/material";
import { FC, memo } from "react";
import { VendorAndItemName } from "../../../../customTypes/types";
import RowBarcodeImage from "./RowBarcodeImage";
import RowItemName from "./RowItemName";
import RowItemNumber from "./RowItemNumber";

type Props = VendorAndItemName;

const RowSingleItemInfo: FC<Props> = ({ itemName, vendorName }) => (
  <div
    className="container"
    key={`${itemName}${vendorName}-VendorColumn-Container-name`}>
    <List>
      <RowItemName
        itemName={itemName}
      />
      <RowItemNumber
        itemName={itemName}
      />
      <RowBarcodeImage
        itemName={itemName}
        vendorName={vendorName}
      />
    </List>
  </div>
);

export default memo<Props>(RowSingleItemInfo);
