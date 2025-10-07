import List from "@mui/material/List"
import ListItemText from "@mui/material/ListItemText"
import { memo } from "react"
import VendorLink from "../../VendorLink.js"
import RowBarcodeImage from "../RowBarcodeImage.js"
import RowItemName from "../RowItemName.js"
import RowItemNumber from "../RowItemNumber.js"

const ModalBodyContent = () => (
  <div className="justify-content-center text-center fs-4 row">
    <div className="justify-content-center col-10">
      <div className="container">
        <List>
          <RowItemName />
          <RowItemNumber />
          <RowBarcodeImage />
          <ListItemText>
            <VendorLink />
          </ListItemText>
        </List>
      </div>
    </div>
  </div>
)

export default memo(ModalBodyContent)
