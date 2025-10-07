import { createContext, memo } from "react"
import type { PropsWithRequiredChildren } from "../types/tsHelpers.js"

type Props = PropsWithRequiredChildren<{
  readonly vendorId: number
}>

export const VendorIdContext = createContext<number>(0)

const VendorIdProvider = ({ children, vendorId }: Props) => (
  <VendorIdContext.Provider value={vendorId}>
    {children}
  </VendorIdContext.Provider>
)

export default memo(VendorIdProvider)
