import Button from "@mui/material/Button"
import Collapse from "@mui/material/Collapse"
import type { FC } from "react"
import { memo, useCallback, useState } from "react"

import useVendorId from "../../hooks/useVendorId"
import { useOfficialVendorName } from "../../redux/selectors"
import RowCounterBadge from "./IndividualRowComponents/RowCounterBadge"
import VendorColumnCard from "./VendorColumnCard"

const VendorColumn: FC = () => {
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
}

export default memo(VendorColumn)
