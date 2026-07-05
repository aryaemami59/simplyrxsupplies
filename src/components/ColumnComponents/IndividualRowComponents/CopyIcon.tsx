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
   * The text content to be copied to the clipboard when the icon is clicked.
   * This should be either an item name or item number, depending on the
   * context in which the {@linkcode CopyIcon} is used.
   *
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
   * A label indicating the type of content being copied, which is used in the
   * tooltip message when the copy action is performed. This should be either
   * `"Name"` or `"Number"` to reflect whether the content is an item name or
   * item number, respectively.
   *
   * @example
   * <caption>Copy button label for item name</caption>
   *
   * ```tsx
   * "Name"
   * ```
   *
   * @example
   * <caption>Copy button label for item number</caption>
   *
   * ```tsx
   * "Number"
   * ```
   */
  readonly text: "Name" | "Number"
}

export const CopyIcon = ({ content, text }: Props) => {
  const title = `Copied Item ${text}!`

  const { hideTooltip, open, showTooltip } = useTooltip()

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
