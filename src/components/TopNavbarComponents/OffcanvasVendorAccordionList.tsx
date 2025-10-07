import type { FC } from "react"
import { memo } from "react"
import VendorIdProvider from "../../contexts/VendorIdProvider.js"
import { useVendorIds } from "../../hooks/useVendorIds.js"
import OffcanvasVendorAccordion from "./OffcanvasVendorAccordion.js"

const OffcanvasVendorAccordionList: FC = () => {
  const vendorNames = useVendorIds()

  return (
    <>
      {vendorNames.map(vendorName => (
        <VendorIdProvider key={vendorName} vendorId={vendorName}>
          <OffcanvasVendorAccordion
            key={`${vendorName.toString()}-OffcanvasVendorAccordionList`}
          />
        </VendorIdProvider>
      ))}
    </>
  )
}

export default memo(OffcanvasVendorAccordionList)
