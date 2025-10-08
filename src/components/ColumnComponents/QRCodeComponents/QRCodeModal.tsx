import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import type { MouseEventHandler } from "react"
import { useCallback, useState } from "react"
import { Tooltip } from "../../../shared/components/Tooltip.js"
import { QRCodeDialog } from "./QRCodeDialog.js"

const title = "Take a Closer Look at The QR Code"

const startIcon = <FontAwesomeIcon icon={faMagnifyingGlassPlus} />

export const QRCodeModal = () => {
  const [show, setShow] = useState(false)

  const showModal = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    setShow(true)
  }, [])

  const hideModal = useCallback(() => {
    setShow(false)
  }, [])

  return (
    <>
      <Tooltip title={title}>
        <IconButton
          className="d-inline-block w-auto"
          onClick={showModal}
          size="large"
        >
          {startIcon}
        </IconButton>
      </Tooltip>
      <QRCodeDialog hideModal={hideModal} isModalOpen={show} />
    </>
  )
}
