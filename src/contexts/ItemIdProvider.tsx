import { createContext } from "react"
import type { ItemIdAndVendorId } from "../types/reduxHelperTypes.js"
import type { PropsWithRequiredChildren } from "../types/tsHelpers.js"

type Props = PropsWithRequiredChildren<Pick<ItemIdAndVendorId, "itemId">>

export const ItemIdContext = createContext<number>(0)

export const ItemIdProvider = ({ children, itemId }: Props) => (
  <ItemIdContext.Provider value={itemId}>{children}</ItemIdContext.Provider>
)
