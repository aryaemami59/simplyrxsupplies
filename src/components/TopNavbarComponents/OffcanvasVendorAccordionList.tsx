import type { FC } from "react"
import { memo } from "react"
import VendorIdProvider from "../../contexts/VendorIdProvider"
import { useVendorIds } from "../../hooks/useVendorIds"
import OffcanvasVendorAccordion from "./OffcanvasVendorAccordion"

const OffcanvasVendorAccordionList: FC = () => {
  const vendorNames = useVendorIds()

  return (
    <>
      {vendorNames.map(vendorName => (
        <VendorIdProvider key={vendorName} vendorId={vendorName}>
          <OffcanvasVendorAccordion
            key={`${vendorName}-OffcanvasVendorAccordionList`}
          />
        </VendorIdProvider>
      ))}
    </>
  )
}

export default memo(OffcanvasVendorAccordionList)
