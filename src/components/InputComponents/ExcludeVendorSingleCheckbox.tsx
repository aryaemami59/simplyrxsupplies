import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { memo, useCallback, useMemo, useState } from "react"
import { useVendorId } from "../../hooks/useVendorId.js"
import {
  checkedOneVendorForAllSearchResults,
  unCheckedOneVendorForAllSearchResults,
} from "../../redux/addedSlice.js"
import { useAppDispatch } from "../../redux/hooks.js"
import { useOfficialVendorName } from "../../redux/selectors.js"

export const ExcludeVendorSingleCheckbox = memo(() => {
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
})
