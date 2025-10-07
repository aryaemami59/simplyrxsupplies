import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import type { MouseEventHandler } from "react"
import { memo, useCallback } from "react"
import { itemAddedToCarts } from "../../redux/addedSlice.js"
import { useAppDispatch, useAppSelector } from "../../redux/hooks.js"
import {
  checkIfAddedToAllVendors,
  useCheckedVendorIds,
  useItemName,
  useVendorIdsByItemId,
} from "../../redux/selectors.js"
import { isEmptyArray } from "../../utils/predicates/isEmptyArray.js"
import { SideBarVendorBadges } from "./SideBarVendorBadges.js"

type Props = {
  readonly itemId: number
}

export const SingleSideBarCategoryListItem = memo(({ itemId }: Props) => {
  const dispatch = useAppDispatch()

  const ifAddedToAllVendors = useAppSelector(state =>
    checkIfAddedToAllVendors(state, itemId),
  )

  const itemName = useItemName(itemId)

  const vendorIds = useVendorIdsByItemId(itemId)

  const checkedVendorIds = useCheckedVendorIds(itemId)

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    if (!isEmptyArray(checkedVendorIds)) {
      dispatch(itemAddedToCarts({ itemId }))
    }
  }, [dispatch, itemId, checkedVendorIds])

  return (
    <>
      <div>
        <Button
          className="fw-bold p-auto shadow-sm rounded-pill text-none"
          disabled={ifAddedToAllVendors}
          onClick={clickHandler}
          size="small"
          variant="contained"
        >
          {itemName}
        </Button>
      </div>
      <ButtonGroup className="text-center" orientation="vertical" size="small">
        {!isEmptyArray(vendorIds) &&
          vendorIds.map(vendorId => (
            <SideBarVendorBadges
              itemId={itemId}
              key={`SideBarVendorBadges-${itemId.toString()}${vendorId.toString()}`}
              vendorId={vendorId}
            />
          ))}
      </ButtonGroup>
    </>
  )
})
