import { faCopy } from "@fortawesome/free-regular-svg-icons/faCopy"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import type { FC, MouseEventHandler } from "react"
import { memo, useCallback, useState } from "react"

const startIcon = <FontAwesomeIcon icon={faCopy} />

type Props = {
  content: string
  text: string
}

const CopyIcon: FC<Props> = ({ content, text }) => {
  const copiedText = `Copied Item ${text}!`

  const [show, setShow] = useState(false)

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    setShow(true)
    void navigator.clipboard.writeText(content)
    setTimeout(() => {
      setShow(false)
    }, 1000)
  }, [content])

  return (
    <Tooltip role="tooltip" open={show} title={copiedText}>
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

export default memo<Props>(CopyIcon)
