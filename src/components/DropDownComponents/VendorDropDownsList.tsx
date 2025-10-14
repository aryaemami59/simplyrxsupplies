import { useVendorIds } from "../../hooks/useVendorIds.js"
import { VendorDropDown } from "./VendorDropDown.js"

export const VendorDropDownsList = () => {
  const vendorIds = useVendorIds()

  return (
    <>
      {vendorIds.map(vendorId => (
        <VendorDropDown
          key={`${vendorId.toString()}-VendorDropDown`}
          vendorId={vendorId}
        />
      ))}
    </>
  )
}
