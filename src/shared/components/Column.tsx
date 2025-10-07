import type { Breakpoint } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { memo } from "react"
import type { PropsWithRequiredChildren } from "../../types/tsHelpers.js"

type Props = PropsWithRequiredChildren<{
  /**
   * @default "xs"
   */
  readonly start?: Breakpoint
  readonly end?: Breakpoint
}>

const Column = ({ children, end, start = "xs" }: Props) => {
  const matches = useMediaQuery(theme =>
    end ? theme.breakpoints.between(start, end) : theme.breakpoints.up(start),
  )

  return matches && children
}

export default memo(Column)
