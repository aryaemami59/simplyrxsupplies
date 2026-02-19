import { use } from "react"
import { VendorIdContext } from "../contexts/VendorIdProvider.js"

export const useVendorId = () => {
  const value = use(VendorIdContext)

  if (value == null) {
    throw new Error(
      `${useVendorId.name} must be called within a <VendorIdProvider> component.`,
    )
  }

  return value
}
