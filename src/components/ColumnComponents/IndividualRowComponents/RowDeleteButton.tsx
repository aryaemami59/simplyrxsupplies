import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons/faDeleteLeft"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import type { MouseEventHandler } from "react"
import { memo, useCallback, useState } from "react"
import { useItemId } from "../../../hooks/useItemId.js"
import { useVendorId } from "../../../hooks/useVendorId.js"
import { singleItemRemovedFromCart } from "../../../redux/addedSlice.js"
import { useAppDispatch } from "../../../redux/hooks.js"

const startIcon = <FontAwesomeIcon icon={faDeleteLeft} />

const title = "Delete This Item"

const RowDeleteButton = () => {
  const [open, setOpen] = useState(false)
  const itemId = useItemId()
  const vendorId = useVendorId()
  const dispatch = useAppDispatch()

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    dispatch(singleItemRemovedFromCart({ itemId, vendorId }))
  }, [dispatch, itemId, vendorId])

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
        className="w-auto d-inline-block"
        onClick={clickHandler}
        size="medium"
      >
        {startIcon}
      </IconButton>
    </Tooltip>
  )
}

export default memo(RowDeleteButton)
