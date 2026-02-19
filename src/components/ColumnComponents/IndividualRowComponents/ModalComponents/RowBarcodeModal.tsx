import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import type { MouseEventHandler } from "react"
import { useCallback, useState } from "react"
import { Tooltip } from "../../../../shared/components/Tooltip.js"
import { RowBarcodeDialog } from "./RowBarcodeDialog.js"

const title = "Take a Closer Look at The Barcode"

const startIcon = <FontAwesomeIcon icon={faMagnifyingGlassPlus} />

export const RowBarcodeModal = () => {
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
          size="small"
        >
          {startIcon}
        </IconButton>
      </Tooltip>
      <RowBarcodeDialog hideModal={hideModal} isModalOpen={show} />
    </>
  )
}
