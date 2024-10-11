import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import PropTypes from "prop-types"
import type { FC, MouseEventHandler } from "react"
import { memo, useCallback } from "react"
import { itemAddedToCarts } from "../../redux/addedSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  checkIfAddedToAllVendors,
  useCheckedVendorIds,
  useItemName,
  useVendorIdsByItemId,
} from "../../redux/selectors"
import { isEmptyArray } from "../../utils/predicates/isEmptyArray"
import SideBarVendorBadges from "./SideBarVendorBadges"

type Props = {
  itemId: number
}

const SingleSideBarCategoryListItem: FC<Props> = ({ itemId }) => {
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
              key={`SideBarVendorBadges-${itemId.toString()}${vendorId.toString()}`}
              itemId={itemId}
              vendorId={vendorId}
            />
          ))}
      </ButtonGroup>
    </>
  )
}

SingleSideBarCategoryListItem.propTypes = {
  itemId: PropTypes.number.isRequired,
}

export default memo<Props>(SingleSideBarCategoryListItem)
