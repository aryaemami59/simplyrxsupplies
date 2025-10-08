import { faClipboard } from "@fortawesome/free-regular-svg-icons/faClipboard"
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons/faClipboardCheck"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "@mui/material/Button"
import type { MouseEventHandler } from "react"
import { useCallback, useMemo } from "react"
import { useTooltip } from "../../../hooks/useTooltip.js"
import { Tooltip } from "../../../shared/components/Tooltip.js"

type Props = {
  /**
   * @example
   * <caption>Item Name</caption>
   *
   * ```tsx
   * "10 Dram Vials"
   * ```
   *
   * @example
   * <caption>Item Number</caption>
   *
   * ```tsx
   * "09670503346"
   * ```
   */
  readonly content: string

  /**
   * @example "Name"
   *
   * @example "Number"
   */
  readonly text: string
}

export const CopyIcon = ({ content, text }: Props) => {
  const title = `Copied Item ${text}!`

  const { open, showTooltip, hideTooltip } = useTooltip()

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    void navigator.clipboard.writeText(content)

    showTooltip()

    setTimeout(hideTooltip, 1000)
  }, [content, hideTooltip, showTooltip])

  const startIcon = useMemo(
    () => <FontAwesomeIcon icon={open ? faClipboardCheck : faClipboard} />,
    [open],
  )

  return (
    <Tooltip open={open} title={title}>
      <Button
        className="fw-bold w-auto p-auto shadow-sm rounded-pill text-none"
        onClick={handleClick}
        size="small"
        startIcon={startIcon}
        variant="contained"
      >
        Copy Item {text}
      </Button>
    </Tooltip>
  )
}
