import Card from "@mui/material/Card"
import type { FC } from "react"
import { memo } from "react"
import { useVendorId } from "../../hooks/useVendorId.js"
import { useCheckIfAnyAddedToOneVendor } from "../../redux/selectors.js"
import ColumnTopCardBody from "./ColumnTopCardBody.js"
import EmptyColumn from "./EmptyColumn.js"

const VendorColumnCard: FC = () => {
  const vendorId = useVendorId()
  const anyAdded = useCheckIfAnyAddedToOneVendor(vendorId)

  return <Card>{anyAdded ? <ColumnTopCardBody /> : <EmptyColumn />}</Card>
}

export default memo(VendorColumnCard)
