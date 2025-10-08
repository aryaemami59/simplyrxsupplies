import { faMaximize } from "@fortawesome/free-solid-svg-icons/faMaximize"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import { useCallback } from "react"
import { useVendorId } from "../../../hooks/useVendorId.js"
import { maximizedAllItemsInCart } from "../../../redux/addedSlice.js"
import { useAppDispatch } from "../../../redux/hooks.js"
import { Tooltip } from "../../../shared/components/Tooltip.js"

const title = "Expand All Items"

const startIcon = <FontAwesomeIcon icon={faMaximize} />

export const ExpandAllButton = () => {
  const vendorId = useVendorId()

  const dispatch = useAppDispatch()

  const toggleCollapse = useCallback(() => {
    dispatch(maximizedAllItemsInCart({ vendorId }))
  }, [dispatch, vendorId])

  return (
    <Tooltip title={title}>
      <IconButton
        className="d-inline-block w-auto"
        onClick={toggleCollapse}
        size="large"
      >
        {startIcon}
      </IconButton>
    </Tooltip>
  )
}
