import type { Breakpoint } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import type { PropsWithRequiredChildren } from "../../types/tsHelpers.js"

type Props = PropsWithRequiredChildren<{
  /**
   * The upper MUI {@linkcode Breakpoint} bound (exclusive). When provided, the
   * component renders only while the viewport is between
   * {@linkcode Props.start | start} and {@linkcode Props.end | end} via
   * `theme.breakpoints.between`. When omitted, only the lower
   * {@linkcode Props.start | start} bound is applied via
   * `theme.breakpoints.up`.
   */
  readonly end?: Breakpoint

  /**
   * The lower MUI {@linkcode Breakpoint} bound (inclusive). The component
   * renders when the viewport is at or above this breakpoint.
   *
   * @default "xs"
   */
  readonly start?: Breakpoint
}>

/**
 * Conditionally renders its {@linkcode children} based on the current
 * viewport width using MUI's {@linkcode useMediaQuery}. When only
 * {@linkcode start} is provided the component is visible from that breakpoint
 * upward. When {@linkcode end} is also provided the component is visible only
 * between the two breakpoints.
 *
 * @param children - The content to render when the breakpoint condition is met.
 * @param end - Optional upper breakpoint bound.
 * @param start - Lower breakpoint bound.
 */
export const Column = ({ children, end, start = "xs" }: Props) => {
  const matches = useMediaQuery(theme =>
    end ? theme.breakpoints.between(start, end) : theme.breakpoints.up(start),
  )

  return matches && children
}
