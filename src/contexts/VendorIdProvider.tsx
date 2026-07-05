import { createContext } from "react"
import type { ItemIdAndVendorId } from "../types/reduxHelperTypes.js"
import type { PropsWithRequiredChildren } from "../types/tsHelpers.js"

type Props = PropsWithRequiredChildren<Pick<ItemIdAndVendorId, "vendorId">>

/**
 * React context that holds the current
 * {@linkcode ItemIdAndVendorId.vendorId | vendorId}. Consumed by
 * {@linkcode useVendorId}, which asserts the value is non-null.
 *
 * @default null
 */
export const VendorIdContext = createContext<
  ItemIdAndVendorId["vendorId"] | null
>(null)

/**
 * Provides the current {@linkcode ItemIdAndVendorId.vendorId | vendorId} to
 * its subtree via {@linkcode VendorIdContext}.
 *
 * @param children - The component subtree that will receive the vendor ID context.
 * @param vendorId - The vendor ID to make available via {@linkcode VendorIdContext}.
 */
export const VendorIdProvider = ({ children, vendorId }: Props) => (
  <VendorIdContext value={vendorId}>{children}</VendorIdContext>
)
