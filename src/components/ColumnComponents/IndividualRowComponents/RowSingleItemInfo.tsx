import List from "@mui/material/List"
import { RowBarcodeImage } from "./RowBarcodeImage.js"
import { RowItemName } from "./RowItemName.js"
import { RowItemNumber } from "./RowItemNumber.js"

export const RowSingleItemInfo = () => (
  <div className="container">
    <List>
      <RowItemName />
      <RowItemNumber />
      <RowBarcodeImage />
    </List>
  </div>
)
