import Button from "@mui/material/Button"
import Collapse from "@mui/material/Collapse"
import { memo, useCallback, useState } from "react"
import { useVendorId } from "../../hooks/useVendorId.js"
import { useOfficialVendorName } from "../../redux/selectors.js"
import { RowCounterBadge } from "./IndividualRowComponents/RowCounterBadge.js"
import { VendorColumnCard } from "./VendorColumnCard.js"

export const VendorColumn = memo(() => {
  const vendorId = useVendorId()

  const [open, setOpen] = useState(false)

  const officialVendorName = useOfficialVendorName(vendorId)

  const buttonClick = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  return (
    <>
      <Button
        className="d-block w-100"
        onClick={buttonClick}
        variant="contained"
      >
        {officialVendorName}
        <RowCounterBadge />
      </Button>
      <Collapse
        // mountOnEnter
        // unmountOnExit
        in={open}
      >
        <div>
          <VendorColumnCard />
        </div>
      </Collapse>
    </>
  )
})
