import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import type { FC } from "react"
import { memo, useCallback, useMemo } from "react"

import { toggledVendorForOneSearchResultItem } from "../../redux/addedSlice"
import { useAppDispatch } from "../../redux/hooks"
import {
  useCheckIfAddedToVendor,
  useIsVendorChecked,
  useOfficialVendorName,
} from "../../redux/selectors"
import type { ItemIdAndVendorId } from "../../types/reduxHelperTypes"

type Props = ItemIdAndVendorId

const SideBarVendorBadges: FC<Props> = ({ itemId, vendorId }) => {
  const dispatch = useAppDispatch()

  const officialVendorName = useOfficialVendorName(vendorId)

  const checked = useIsVendorChecked(itemId, vendorId)

  const disabled = useCheckIfAddedToVendor(vendorId, itemId)

  const clickHandler = useCallback(() => {
    dispatch(toggledVendorForOneSearchResultItem({ itemId, vendorId }))
  }, [dispatch, itemId, vendorId])

  const control = useMemo(
    () => (
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={clickHandler}
        size="small"
      />
    ),
    [checked, clickHandler, disabled],
  )

  return (
    <FormControlLabel
      className="fs-7"
      control={control}
      disableTypography
      label={officialVendorName}
    />
  )
}

export default memo<Props>(SideBarVendorBadges)
