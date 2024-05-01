import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import type { FC } from "react"
import { memo, useCallback, useMemo, useState } from "react"
import { useVendorId } from "../../hooks/useVendorId"
import {
  checkedOneVendorForAllSearchResults,
  unCheckedOneVendorForAllSearchResults,
} from "../../redux/addedSlice"
import { useAppDispatch } from "../../redux/hooks"
import { useOfficialVendorName } from "../../redux/selectors"

const ExcludeVendorSingleCheckbox: FC = () => {
  const dispatch = useAppDispatch()

  const vendorId = useVendorId()

  const [checked, setChecked] = useState(true)

  const officialVendorName = useOfficialVendorName(vendorId)

  const handleChange = useCallback(() => {
    if (checked) {
      dispatch(unCheckedOneVendorForAllSearchResults({ vendorId }))
    } else {
      dispatch(checkedOneVendorForAllSearchResults({ vendorId }))
    }
    setChecked(prev => !prev)
  }, [checked, dispatch, vendorId])

  const control = useMemo(
    () => <Checkbox checked={checked} onChange={handleChange} />,
    [checked, handleChange],
  )

  return (
    <FormControlLabel
      className="fs-7"
      control={control}
      disableTypography
      label={officialVendorName}
      labelPlacement="top"
    />
  )
}

export default memo(ExcludeVendorSingleCheckbox)
