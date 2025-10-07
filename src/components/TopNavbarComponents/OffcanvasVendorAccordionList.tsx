import { memo } from "react"
import VendorIdProvider from "../../contexts/VendorIdProvider.js"
import { useVendorIds } from "../../hooks/useVendorIds.js"
import OffcanvasVendorAccordion from "./OffcanvasVendorAccordion.js"

const OffcanvasVendorAccordionList = () => {
  const vendorIds = useVendorIds()

  return (
    <>
      {vendorIds.map(vendorId => (
        <VendorIdProvider key={vendorId} vendorId={vendorId}>
          <OffcanvasVendorAccordion />
        </VendorIdProvider>
      ))}
    </>
  )
}

export default memo(OffcanvasVendorAccordionList)
