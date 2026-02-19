import { VendorIdProvider } from "../../contexts/VendorIdProvider.js"
import { useVendorIds } from "../../hooks/useVendorIds.js"
import { OffcanvasVendorAccordion } from "./OffcanvasVendorAccordion.js"

export const OffcanvasVendorAccordionList = () => {
  const vendorIds = useVendorIds()

  return (
    <>
      {vendorIds.map(vendorId => (
        <VendorIdProvider
          key={`${vendorId.toString()}-VendorIdProvider`}
          vendorId={vendorId}
        >
          <OffcanvasVendorAccordion />
        </VendorIdProvider>
      ))}
    </>
  )
}
