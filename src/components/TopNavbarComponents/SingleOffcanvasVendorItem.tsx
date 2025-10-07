import Button from "@mui/material/Button"
import type { MouseEventHandler } from "react"
import { memo, useCallback } from "react"
import { useItemId } from "../../hooks/useItemId.js"
import { useVendorId } from "../../hooks/useVendorId.js"
import { itemAddedToCarts } from "../../redux/addedSlice.js"
import { useAppDispatch } from "../../redux/hooks.js"
import { useCheckIfAddedToVendor, useItemName } from "../../redux/selectors.js"

export const SingleOffcanvasVendorItem = memo(() => {
  const vendorId = useVendorId()
  const itemId = useItemId()
  const dispatch = useAppDispatch()
  const itemName = useItemName(itemId)

  const ifAddedToVendor = useCheckIfAddedToVendor(vendorId, itemId)

  const clickHandler = useCallback<MouseEventHandler<HTMLElement>>(() => {
    if (!ifAddedToVendor) {
      dispatch(itemAddedToCarts({ itemId }))
    }
  }, [ifAddedToVendor, dispatch, itemId])

  return (
    <div>
      <Button
        className="fw-bold w-100 my-1 fw-bold shadow-sm rounded-pill text-none"
        disabled={ifAddedToVendor}
        onClick={clickHandler}
        size="large"
        variant="contained"
      >
        {itemName}
      </Button>
    </div>
  )
})
