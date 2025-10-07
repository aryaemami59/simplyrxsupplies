import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { useCallback, useState } from "react"
import { useVendorId } from "../../../hooks/useVendorId.js"
import { allItemsRemovedFromCart } from "../../../redux/addedSlice.js"
import { useAppDispatch } from "../../../redux/hooks.js"

const startIcon = <FontAwesomeIcon icon={faTrashCan} />

const title = "Remove All Items"

export const RemoveAllButton = () => {
  const [open, setOpen] = useState(false)
  const vendorId = useVendorId()
  const dispatch = useAppDispatch()

  const clickHandler = useCallback(() => {
    dispatch(allItemsRemovedFromCart({ vendorId }))
  }, [dispatch, vendorId])

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
