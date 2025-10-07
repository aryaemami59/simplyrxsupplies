import { faPrint } from "@fortawesome/free-solid-svg-icons/faPrint"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import printjs from "print-js"
import type { MouseEventHandler } from "react"
import { useCallback, useState } from "react"
import { useQRCodeData } from "../../../hooks/useQRCodeData.js"

const header =
  "You can scan this image on the vendor's website to pull up all the items at once."

const startIcon = <FontAwesomeIcon icon={faPrint} />

const title = "Print QR Code"

export const PrintIconQRCode = () => {
  const [open, setOpen] = useState(false)
  const qrCodeData = useQRCodeData()

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    printjs({
      printable: qrCodeData,
      type: "image",
      header,
      imageStyle: "width:80%;margin-bottom:20px;",
    })
  }, [qrCodeData])

  const showTooltip = useCallback(() => {
    setOpen(true)
  }, [])

  const hideTooltip = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      onClose={hideTooltip}
      onOpen={showTooltip}
      open={open}
      role="tooltip"
      title={title}
    >
      <IconButton
        className="d-inline-block w-auto"
        onClick={clickHandler}
        size="large"
      >
        {startIcon}
      </IconButton>
    </Tooltip>
  )
}
