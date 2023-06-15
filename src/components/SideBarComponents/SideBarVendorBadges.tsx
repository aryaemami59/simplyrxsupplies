import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";

import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import { setVendors } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  checkIfItemAddedToOneVendor,
  checkVendorsToAdd,
} from "../../redux/selectors";
import type { VendorAndItemName } from "../../types/api";
import { itemNames, vendorNames } from "../../types/api";

type Props = VendorAndItemName;

const SideBarVendorBadges: FC<Props> = ({ vendorName, itemName }) => {
  const dispatch = useAppDispatch();
  const officialVendorName = useOfficialVendorName(vendorName);

  const checked = useAppSelector(checkVendorsToAdd(vendorName, itemName));

  const disabled = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemName)
  );

  const clickHandler = useCallback(() => {
    dispatch(setVendors({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

  const control = useMemo(
    () => (
      <Checkbox
        size="small"
        checked={checked}
        disabled={disabled}
        onChange={clickHandler}
      />
    ),
    [checked, clickHandler, disabled]
  );

  return (
    <FormControlLabel
      className="fs-7"
      disableTypography
      label={officialVendorName}
      control={control}
    />
  );
};

SideBarVendorBadges.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
  vendorName: PropTypes.oneOf(vendorNames).isRequired,
};

export default memo<Props>(SideBarVendorBadges);
