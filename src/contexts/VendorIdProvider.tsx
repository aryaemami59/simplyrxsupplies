import { createContext } from "react"
import type { ItemIdAndVendorId } from "../types/reduxHelperTypes.js"
import type { PropsWithRequiredChildren } from "../types/tsHelpers.js"

type Props = PropsWithRequiredChildren<Pick<ItemIdAndVendorId, "vendorId">>

export const VendorIdContext = createContext<
  ItemIdAndVendorId["vendorId"] | null
>(null)

export const VendorIdProvider = ({ children, vendorId }: Props) => (
  <VendorIdContext value={vendorId}>{children}</VendorIdContext>
)
