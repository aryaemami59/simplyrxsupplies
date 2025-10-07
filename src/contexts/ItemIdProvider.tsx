import { createContext, memo } from "react"
import type { PropsWithRequiredChildren } from "../types/tsHelpers.js"

type Props = PropsWithRequiredChildren<{
  readonly itemId: number
}>

export const ItemIdContext = createContext<number>(0)

const ItemIdProvider = ({ children, itemId }: Props) => (
  <ItemIdContext.Provider value={itemId}>{children}</ItemIdContext.Provider>
)

export default memo(ItemIdProvider)
