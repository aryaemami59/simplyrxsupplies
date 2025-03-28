import { faMaximize } from "@fortawesome/free-solid-svg-icons/faMaximize"
import { faMinimize } from "@fortawesome/free-solid-svg-icons/faMinimize"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import type { FC, MouseEventHandler } from "react"
import { memo, useCallback, useMemo, useState } from "react"

const EXPAND = "Expand"
const COLLAPSE = "Collapse"

type Props = {
  isTooltipOpen: boolean
  toggle: MouseEventHandler<HTMLButtonElement>
}

const CollapseButton: FC<Props> = ({ isTooltipOpen, toggle }) => {
  const [show, setShow] = useState(false)
  const startIcon = useMemo(
    () => <FontAwesomeIcon icon={isTooltipOpen ? faMaximize : faMinimize} />,
    [isTooltipOpen],
  )

  const buttonText = isTooltipOpen ? EXPAND : COLLAPSE

  const showTooltip = useCallback(() => {
    setShow(true)
  }, [])

  const hideTooltip = useCallback(() => {
    setShow(false)
  }, [])

  return (
    <Tooltip
      role="tooltip"
      enterDelay={500}
      enterNextDelay={500}
      onClose={hideTooltip}
      onOpen={showTooltip}
      open={show}
      title={`${buttonText} Item Info`}
    >
      <IconButton
        className="w-auto d-inline-block"
        onClick={toggle}
        size="medium"
      >
        {startIcon}
      </IconButton>
    </Tooltip>
  )
}

export default memo<Props>(CollapseButton)
