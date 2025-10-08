import { useCallback, useState } from "react"

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
    /**
     * Hides the tooltip.
     */
    hideTooltip,
  } as const
}
