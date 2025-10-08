import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons/faDeleteLeft"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import type { MouseEventHandler } from "react"
import { useCallback } from "react"
import { useItemId } from "../../../hooks/useItemId.js"
import { useVendorId } from "../../../hooks/useVendorId.js"
import { singleItemRemovedFromCart } from "../../../redux/addedSlice.js"
import { useAppDispatch } from "../../../redux/hooks.js"
import { Tooltip } from "../../../shared/components/Tooltip.js"

const startIcon = <FontAwesomeIcon icon={faDeleteLeft} />

const title = "Delete This Item"

export const RowDeleteButton = () => {
  const itemId = useItemId()

  const vendorId = useVendorId()

  const dispatch = useAppDispatch()

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    dispatch(singleItemRemovedFromCart({ itemId, vendorId }))
  }, [dispatch, itemId, vendorId])

  return (
    <Tooltip title={title}>
      <IconButton className="w-auto d-inline-block" onClick={clickHandler}>
        {startIcon}
      </IconButton>
    </Tooltip>
  )
}
