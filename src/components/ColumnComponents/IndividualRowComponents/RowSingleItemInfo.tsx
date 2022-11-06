import { List } from "@mui/material";
import { FC, memo } from "react";
import RowBarcodeImage from "./RowBarcodeImage";
import RowItemName from "./RowItemName";
import RowItemNumber from "./RowItemNumber";

const RowSingleItemInfo: FC = () => (
  <div className="container">
    <List>
      <RowItemName />
      <RowItemNumber />
      <RowBarcodeImage />
    </List>
  </div>
);

export default memo(RowSingleItemInfo);
