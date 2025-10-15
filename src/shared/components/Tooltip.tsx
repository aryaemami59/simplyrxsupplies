import type { TooltipProps as MuiTooltipProps } from "@mui/material"
import { Tooltip as MuiTooltip } from "@mui/material"
import { useTooltip } from "../../hooks/useTooltip.js"
import type { PropsWithRequiredChildren } from "../../types/tsHelpers.js"

export type TooltipProps = PropsWithRequiredChildren<MuiTooltipProps>

export const Tooltip = (props: TooltipProps) => {
  const { hideTooltip, open, showTooltip } = useTooltip()

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
