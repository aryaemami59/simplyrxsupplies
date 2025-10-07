import MenuItem from "@mui/material/MenuItem"
import type { FC, MouseEventHandler } from "react"
import { memo, useCallback } from "react"
import { itemAddedToCarts } from "../../redux/addedSlice.js"
import { useAppDispatch } from "../../redux/hooks.js"
import { useCheckIfAddedToVendor, useItemName } from "../../redux/selectors.js"

type Props = {
  itemId: number
  vendorId: number
}

const SingleDropDown: FC<Props> = ({ itemId, vendorId }) => {
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
      key={itemId}
      className="text-wrap"
      disabled={ifAddedToVendor}
      onClick={clickHandler}
    >
      {itemName}
    </MenuItem>
  )
}

export default memo<Props>(SingleDropDown)
