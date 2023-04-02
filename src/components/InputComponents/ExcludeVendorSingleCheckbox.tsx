import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import type { FC } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import useVendorName from "../../hooks/useVendorName";
import {
  setVendorsForAllCheck,
  setVendorsForAllUncheck,
} from "../../redux/addedSlice";
import { useAppDispatch } from "../../redux/hooks";

const ExcludeVendorSingleCheckbox: FC = () => {
  const vendorName = useVendorName();
  const [checked, setChecked] = useState(true);
  const officialVendorName = useOfficialVendorName(vendorName);
  const dispatch = useAppDispatch();

  const handleChange = useCallback(() => {
    // dispatch(setVendorsForAllCheck(vendorName));
    checked
      ? dispatch(setVendorsForAllUncheck(vendorName))
      : dispatch(setVendorsForAllCheck(vendorName));
    setChecked(prev => !prev);
  }, [checked, dispatch, vendorName]);

  const control = useMemo(
    () => (
      <Checkbox
        checked={checked}
        onChange={handleChange}
      />
    ),
    [checked, handleChange]
  );

  return (
    <FormControlLabel
      labelPlacement="top"
      className="fs-7"
      disableTypography
      label={officialVendorName}
      control={control}
    />
  );
};

export default memo(ExcludeVendorSingleCheckbox);
