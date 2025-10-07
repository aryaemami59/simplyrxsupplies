import { VendorIdProvider } from "../../contexts/VendorIdProvider.js"
import { useVendorIds } from "../../hooks/useVendorIds.js"
import { VendorColumn } from "./VendorColumn.js"

export const VendorColumnList = () => {
  const vendorIds = useVendorIds()

  return (
    <div className="justify-content-center row">
      <div className="shadow col-11 col-xl-10 p-0 justify-content-center text-center">
        {vendorIds.map(vendorId => (
          <VendorIdProvider
            key={`${vendorId.toString()}-VendorColumnList`}
            vendorId={vendorId}
          >
            <VendorColumn />
          </VendorIdProvider>
        ))}
      </div>
    </div>
  )
}
