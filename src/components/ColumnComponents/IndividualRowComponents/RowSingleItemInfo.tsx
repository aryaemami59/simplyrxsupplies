import List from "@mui/material/List";
import type { FC } from "react";
import { memo } from "react";

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
