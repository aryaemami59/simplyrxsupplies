import { faMinimize } from "@fortawesome/free-solid-svg-icons/faMinimize"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import { useCallback } from "react"
import { useVendorId } from "../../../hooks/useVendorId.js"
import { minimizedAllItemsInCart } from "../../../redux/addedSlice.js"
import { useAppDispatch } from "../../../redux/hooks.js"
import { Tooltip } from "../../../shared/components/Tooltip.js"

const title = "Collapse All Items"

const startIcon = <FontAwesomeIcon icon={faMinimize} />

export const CollapseAllButton = () => {
  const dispatch = useAppDispatch()

  const vendorId = useVendorId()

  const toggleCollapse = useCallback(() => {
    dispatch(minimizedAllItemsInCart({ vendorId }))
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
