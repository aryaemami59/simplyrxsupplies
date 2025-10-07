import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import { memo } from "react"
import { VendorIdProvider } from "../../contexts/VendorIdProvider.js"
import { useVendorIds } from "../../hooks/useVendorIds.js"
import { ExcludeVendorSingleCheckbox } from "./ExcludeVendorSingleCheckbox.js"

export const ExcludeVendors = memo(() => {
  const vendorIds = useVendorIds()

  return (
    <>
      <Button className="mt-3" variant="contained">
        Exclude Vendors
      </Button>
      <ButtonGroup size="small">
        {vendorIds.map(vendorId => (
          <VendorIdProvider
            key={`${vendorId.toString()}-ExcludeVendors`}
            vendorId={vendorId}
          >
            <ExcludeVendorSingleCheckbox />
          </VendorIdProvider>
        ))}
      </ButtonGroup>
    </>
  )
})
