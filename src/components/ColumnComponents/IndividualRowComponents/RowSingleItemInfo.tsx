import List from "@mui/material/List"
import { memo } from "react"
import { RowBarcodeImage } from "./RowBarcodeImage.js"
import { RowItemName } from "./RowItemName.js"
import { RowItemNumber } from "./RowItemNumber.js"

export const RowSingleItemInfo = memo(() => (
  <div className="container">
    <List>
      <RowItemName />
      <RowItemNumber />
      <RowBarcodeImage />
    </List>
  </div>
))
