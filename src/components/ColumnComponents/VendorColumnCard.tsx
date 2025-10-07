import Card from "@mui/material/Card"
import { memo } from "react"
import { useVendorId } from "../../hooks/useVendorId.js"
import { useCheckIfAnyAddedToOneVendor } from "../../redux/selectors.js"
import ColumnTopCardBody from "./ColumnTopCardBody.js"
import EmptyColumn from "./EmptyColumn.js"

const VendorColumnCard = () => {
  const vendorId = useVendorId()
  const anyAdded = useCheckIfAnyAddedToOneVendor(vendorId)

  return <Card>{anyAdded ? <ColumnTopCardBody /> : <EmptyColumn />}</Card>
}

export default memo(VendorColumnCard)
