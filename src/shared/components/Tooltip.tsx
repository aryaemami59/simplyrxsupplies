import type { TooltipProps } from "@mui/material"
import { Tooltip as MuiTooltip } from "@mui/material"
import { useTooltip } from "../../hooks/useTooltip.js"
import type { PropsWithRequiredChildren } from "../../types/tsHelpers.js"

type Props = PropsWithRequiredChildren<TooltipProps>

export const Tooltip = (props: Props) => {
  const { open, showTooltip, hideTooltip } = useTooltip()

  return (
    <MuiTooltip
      enterDelay={500}
      enterNextDelay={500}
      onClose={hideTooltip}
      onOpen={showTooltip}
      open={open}
      role="tooltip"
      {...props}
    />
  )
}
