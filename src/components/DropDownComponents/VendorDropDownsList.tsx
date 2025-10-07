import { memo } from "react"
import { useVendorIds } from "../../hooks/useVendorIds.js"
import VendorDropDown from "./VendorDropDown.js"

const VendorDropDownsList = () => {
  const vendorIds = useVendorIds()

  return (
    <>
      {vendorIds.map(vendorId => (
        <VendorDropDown
          key={`${vendorId.toString()}-VendorDropDownsList-VendorDropDown`}
          vendorId={vendorId}
        />
      ))}
    </>
  )
}

export default memo(VendorDropDownsList)
