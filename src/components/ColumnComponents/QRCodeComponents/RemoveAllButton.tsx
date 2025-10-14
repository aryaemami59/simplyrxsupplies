import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import { useCallback } from "react"
import { useVendorId } from "../../../hooks/useVendorId.js"
import { allItemsRemovedFromCart } from "../../../redux/addedSlice.js"
import { useAppDispatch } from "../../../redux/hooks.js"
import { Tooltip } from "../../../shared/components/Tooltip.js"

const startIcon = <FontAwesomeIcon icon={faTrashCan} />

const title = "Remove All Items"

export const RemoveAllButton = () => {
  const dispatch = useAppDispatch()

  const vendorId = useVendorId()

  const clickHandler = useCallback(() => {
    dispatch(allItemsRemovedFromCart({ vendorId }))
  }, [dispatch, vendorId])

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
