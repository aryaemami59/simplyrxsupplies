import { useCallback, useState } from "react"

/**
 * Manages the open/closed state of a tooltip via controlled boolean state.
 * Returns stable callbacks (memoized via {@linkcode useCallback()}) for
 * showing and hiding the tooltip, alongside the raw state setter for advanced
 * use.
 *
 * @returns An object containing the current open state and callbacks to show, hide, or directly set the tooltip visibility.
 */
export const useTooltip = () => {
  const [open, setOpen] = useState(false)

  const showTooltip = useCallback(() => {
    setOpen(true)
  }, [])

  const hideTooltip = useCallback(() => {
    setOpen(false)
  }, [])

  return {
    /**
     * Hides the tooltip.
     */
    hideTooltip,

    /**
     * Whether the tooltip is open.
     */
    open,

    /**
     * Function to directly set the open state.
     */
    setOpen,

    /**
     * Shows the tooltip.
     */
    showTooltip,
  } as const
}
