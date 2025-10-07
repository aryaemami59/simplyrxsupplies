import List from "@mui/material/List"
import { memo } from "react"
import RowBarcodeImage from "./RowBarcodeImage.js"
import RowItemName from "./RowItemName.js"
import RowItemNumber from "./RowItemNumber.js"

const RowSingleItemInfo = () => (
  <div className="container">
    <List>
      <RowItemName />
      <RowItemNumber />
      <RowBarcodeImage />
    </List>
  </div>
)

export default memo(RowSingleItemInfo)
