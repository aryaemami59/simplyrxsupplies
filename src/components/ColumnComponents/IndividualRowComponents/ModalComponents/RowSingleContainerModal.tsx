import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import type { MouseEventHandler } from "react"
import { useCallback, useState } from "react"
import { Tooltip } from "../../../../shared/components/Tooltip.js"
import { RowItemsDialog } from "./RowItemsDialog.js"

const title = "Take a Closer Look at The Item Info"

const startIcon = <FontAwesomeIcon icon={faMagnifyingGlassPlus} />

export const RowSingleContainerModal = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const showModal = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    setModalOpen(true)
  }, [])

  const hideModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  return (
    <>
      <Tooltip title={title}>
        <IconButton className="w-auto d-inline-block" onClick={showModal}>
          {startIcon}
        </IconButton>
      </Tooltip>
      <RowItemsDialog hideModal={hideModal} isModalOpen={modalOpen} />
    </>
  )
}
