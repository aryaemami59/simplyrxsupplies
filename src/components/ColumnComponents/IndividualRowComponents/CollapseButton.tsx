import { faMaximize } from "@fortawesome/free-solid-svg-icons/faMaximize"
import { faMinimize } from "@fortawesome/free-solid-svg-icons/faMinimize"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import type { MouseEventHandler } from "react"
import { useMemo } from "react"
import { Tooltip } from "../../../shared/components/Tooltip.js"

const EXPAND = "Expand"
const COLLAPSE = "Collapse"

type Props = {
  readonly isTooltipOpen: boolean
  readonly toggle: MouseEventHandler<HTMLButtonElement>
}

export const CollapseButton = ({ isTooltipOpen, toggle }: Props) => {
  const startIcon = useMemo(
    () => <FontAwesomeIcon icon={isTooltipOpen ? faMaximize : faMinimize} />,
    [isTooltipOpen],
  )

  const buttonText = isTooltipOpen ? EXPAND : COLLAPSE

  return (
    <Tooltip title={`${buttonText} Item Info`}>
      <IconButton className="w-auto d-inline-block" onClick={toggle}>
        {startIcon}
      </IconButton>
    </Tooltip>
  )
}
