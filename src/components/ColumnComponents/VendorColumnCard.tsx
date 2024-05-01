import Card from "@mui/material/Card"
import type { FC } from "react"
import { memo } from "react"

import { useVendorId } from "../../hooks/useVendorId"
import { useCheckIfAnyAddedToOneVendor } from "../../redux/selectors"
import ColumnTopCardBody from "./ColumnTopCardBody"
import EmptyColumn from "./EmptyColumn"

const VendorColumnCard: FC = () => {
  const vendorId = useVendorId()
  const anyAdded = useCheckIfAnyAddedToOneVendor(vendorId)

  return <Card>{anyAdded ? <ColumnTopCardBody /> : <EmptyColumn />}</Card>
}

export default memo(VendorColumnCard)
