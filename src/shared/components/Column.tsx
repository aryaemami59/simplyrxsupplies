import type { Breakpoint } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import type { FC } from "react"
import { memo } from "react"

import type { PropsWithRequiredChildren } from "../../types/tsHelpers"

type Props = PropsWithRequiredChildren & {
  start?: Breakpoint
  end?: Breakpoint
}

const Column: FC<Props> = ({ children, end, start = "xs" }) => {
  const matches = useMediaQuery(theme =>
    end ? theme.breakpoints.between(start, end) : theme.breakpoints.up(start),
  )
  return matches && children
}

export default memo<Props>(Column)
