import Badge from "@mui/material/Badge"
import { useVendorId } from "../../../hooks/useVendorId.js"
import { useCartItemsLength } from "../../../redux/selectors.js"

export const RowCounterBadge = () => {
  const vendorId = useVendorId()
  const addedItemsLength = useCartItemsLength(vendorId)

  return (
    <span className="float-end">
      <Badge badgeContent={addedItemsLength} color="error" />
    </span>
  )
}
