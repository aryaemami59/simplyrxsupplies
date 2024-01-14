import PropTypes from "prop-types"
import type { FC } from "react"
import { createContext, memo } from "react"

import type { PropsWithRequiredChildren } from "../types/tsHelpers"

type Props = PropsWithRequiredChildren<{
  readonly itemId: number
}>

export const ItemIdContext = createContext<number>(0)

const ItemIdProvider: FC<Props> = ({ children, itemId }) => (
  <ItemIdContext.Provider value={itemId}>{children}</ItemIdContext.Provider>
)

ItemIdProvider.propTypes = {
  children: PropTypes.node.isRequired,
  itemId: PropTypes.number.isRequired,
}

export default memo<Props>(ItemIdProvider)
