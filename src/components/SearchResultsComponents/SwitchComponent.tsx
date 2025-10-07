import FormControlLabel from "@mui/material/FormControlLabel"
import type { SwitchProps } from "@mui/material/Switch"
import Switch from "@mui/material/Switch"
import { useCallback } from "react"
import { toggledVendorForOneSearchResultItem } from "../../redux/addedSlice.js"
import { useAppDispatch } from "../../redux/hooks.js"
import {
  useCheckIfAddedToVendor,
  useIsVendorChecked,
  useOfficialVendorName,
} from "../../redux/selectors.js"
import type { ItemIdAndVendorId } from "../../types/reduxHelperTypes.js"

const slotProps = {
  input: {
    className: "shadow",
  },
} as const satisfies SwitchProps["slotProps"]

const control = <Switch size="small" slotProps={slotProps} />

type Props = Pick<ItemIdAndVendorId, "vendorId"> & {
  readonly visibleListId: number
}

export const SwitchComponent = ({ vendorId, visibleListId }: Props) => {
  const officialVendorName = useOfficialVendorName(vendorId)

  const dispatch = useAppDispatch()

  const checked = useIsVendorChecked(visibleListId, vendorId)

  const disabled = useCheckIfAddedToVendor(vendorId, visibleListId)

  const clickHandler = useCallback(() => {
    dispatch(
      toggledVendorForOneSearchResultItem({ itemId: visibleListId, vendorId }),
    )
  }, [dispatch, vendorId, visibleListId])

  return (
    <FormControlLabel
      checked={checked}
      className="p-0 fs-7"
      control={control}
      disabled={disabled}
      disableTypography
      label={officialVendorName}
      onChange={clickHandler}
    />
  )
}
