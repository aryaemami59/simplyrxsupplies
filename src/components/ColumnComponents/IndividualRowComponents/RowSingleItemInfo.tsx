import List from "@mui/material/List"
import type { FC } from "react"
import { memo } from "react"
import RowBarcodeImage from "./RowBarcodeImage.js"
import RowItemName from "./RowItemName.js"
import RowItemNumber from "./RowItemNumber.js"

const RowSingleItemInfo: FC = () => (
  <div className="container">
    <List>
      <RowItemName />
      <RowItemNumber />
      <RowBarcodeImage />
    </List>
  </div>
)

export default memo(RowSingleItemInfo)
