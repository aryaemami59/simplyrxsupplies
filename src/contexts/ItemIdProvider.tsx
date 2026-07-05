import { createContext } from "react"
import type { ItemIdAndVendorId } from "../types/reduxHelperTypes.js"
import type { PropsWithRequiredChildren } from "../types/tsHelpers.js"

type Props = PropsWithRequiredChildren<Pick<ItemIdAndVendorId, "itemId">>

/**
 * React context that holds the current
 * {@linkcode ItemIdAndVendorId.itemId | itemId}. Consumed by
 * {@linkcode useItemId}, which asserts the value is non-null.
 *
 * @default null
 */
export const ItemIdContext = createContext<ItemIdAndVendorId["itemId"] | null>(
  null,
)

/**
 * Provides the current {@linkcode ItemIdAndVendorId.itemId | itemId} to its
 * subtree via {@linkcode ItemIdContext}.
 *
 * @param children - The component subtree that will receive the item ID context.
 * @param itemId - The item ID to make available via {@linkcode ItemIdContext}.
 */
export const ItemIdProvider = ({ children, itemId }: Props) => (
  <ItemIdContext value={itemId}>{children}</ItemIdContext>
)
