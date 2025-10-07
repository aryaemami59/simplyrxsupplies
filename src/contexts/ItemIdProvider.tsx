import { createContext, memo } from "react"
import type { PropsWithRequiredChildren } from "../types/tsHelpers.js"

type Props = PropsWithRequiredChildren<{
  readonly itemId: number
}>

export const ItemIdContext = createContext<number>(0)

export const ItemIdProvider = memo(({ children, itemId }: Props) => (
  <ItemIdContext.Provider value={itemId}>{children}</ItemIdContext.Provider>
))
