import type { TooltipProps as MuiTooltipProps } from "@mui/material"
import { Tooltip as MuiTooltip } from "@mui/material"
import { useTooltip } from "../../hooks/useTooltip.js"
import type { PropsWithRequiredChildren } from "../../types/tsHelpers.js"

/**
 * Props accepted by the {@linkcode Tooltip} component. Extends all props from
 * {@linkcode MuiTooltipProps} and requires {@linkcode children} to be present.
 */
export type TooltipProps = PropsWithRequiredChildren<MuiTooltipProps>

/**
 * A thin wrapper around MUI's {@linkcode MuiTooltip} that adds opinionated
 * defaults: a 500 ms enter delay (`enterDelay` and `enterNextDelay`) and a
 * controlled open state managed by {@linkcode useTooltip}. Any prop accepted
 * by {@linkcode MuiTooltip} can be passed through and will take precedence
 * over the defaults.
 *
 * @param props - Props forwarded to {@linkcode MuiTooltip}, including a required {@linkcode children} node.
 */
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
