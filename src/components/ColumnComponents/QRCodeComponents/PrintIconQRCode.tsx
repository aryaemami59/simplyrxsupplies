import { faPrint } from "@fortawesome/free-solid-svg-icons/faPrint"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import printjs from "print-js"
import type { MouseEventHandler } from "react"
import { useCallback } from "react"
import { useQRCodeData } from "../../../hooks/useQRCodeData.js"
import { Tooltip } from "../../../shared/components/Tooltip.js"

const header =
  "You can scan this image on the vendor's website to pull up all the items at once."

const startIcon = <FontAwesomeIcon icon={faPrint} />

const title = "Print QR Code"

export const PrintIconQRCode = () => {
  const qrCodeData = useQRCodeData()

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    printjs({
      printable: qrCodeData,
      type: "image",
      header,
      imageStyle: "width:80%;margin-bottom:20px;",
    })
  }, [qrCodeData])

  return (
    <Tooltip title={title}>
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
