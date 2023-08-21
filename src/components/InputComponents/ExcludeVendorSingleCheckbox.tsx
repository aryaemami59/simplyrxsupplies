import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import type { FC } from "react";
import { memo, useCallback, useMemo, useState } from "react";

import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import useVendorId from "../../hooks/useVendorId";
import {
  checkOneVendorForAllSearchResults,
  unCheckOneVendorForAllSearchResults,
} from "../../redux/addedSlice";
import { useAppDispatch } from "../../redux/hooks";

const ExcludeVendorSingleCheckbox: FC = () => {
  const vendorId = useVendorId();
  const [checked, setChecked] = useState(true);
  const officialVendorName = useOfficialVendorName(vendorId);
  const dispatch = useAppDispatch();

  const handleChange = useCallback(() => {
    if (checked) {
      dispatch(unCheckOneVendorForAllSearchResults({ vendorId }));
    } else {
      dispatch(checkOneVendorForAllSearchResults({ vendorId }));
    }
    setChecked(prev => !prev);
  }, [checked, dispatch, vendorId]);

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
      className="fs-7"
      control={control}
      disableTypography
      label={officialVendorName}
      labelPlacement="top"
    />
  );
};

export default memo(ExcludeVendorSingleCheckbox);
