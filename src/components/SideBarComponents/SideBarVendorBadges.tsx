import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { memo, useCallback, useMemo } from "react"
import { toggledVendorForOneSearchResultItem } from "../../redux/addedSlice.js"
import { useAppDispatch } from "../../redux/hooks.js"
import {
  useCheckIfAddedToVendor,
  useIsVendorChecked,
  useOfficialVendorName,
} from "../../redux/selectors.js"
import type { ItemIdAndVendorId } from "../../types/reduxHelperTypes.js"

type Props = ItemIdAndVendorId

const SideBarVendorBadges = ({ itemId, vendorId }: Props) => {
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

export default memo(SideBarVendorBadges)
