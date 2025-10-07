import MenuItem from "@mui/material/MenuItem"
import type { MouseEventHandler } from "react"
import { memo, useCallback } from "react"
import { itemAddedToCarts } from "../../redux/addedSlice.js"
import { useAppDispatch } from "../../redux/hooks.js"
import { useCheckIfAddedToVendor, useItemName } from "../../redux/selectors.js"

type Props = {
  readonly itemId: number
  readonly vendorId: number
}

const SingleDropDown = ({ itemId, vendorId }: Props) => {
  const dispatch = useAppDispatch()

  const itemName = useItemName(itemId)

  const ifAddedToVendor = useCheckIfAddedToVendor(vendorId, itemId)

  const clickHandler = useCallback<MouseEventHandler<HTMLElement>>(() => {
    if (!ifAddedToVendor) {
      dispatch(itemAddedToCarts({ itemId }))
    }
  }, [ifAddedToVendor, dispatch, itemId])

  return (
    <MenuItem
      className="text-wrap"
      disabled={ifAddedToVendor}
      onClick={clickHandler}
    >
      {itemName}
    </MenuItem>
  )
}

export default memo(SingleDropDown)
