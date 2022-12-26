import { Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import { setVendors } from "../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  checkIfItemAddedToOneVendor,
  checkVendorsToAdd,
} from "../../Redux/selectors";
import useOfficialVendorName from "../../hooks/useOfficialVendorName";
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
        checked={checked}
        disabled={disabled}
        onChange={clickHandler}
      />
    ),
    [checked, clickHandler, disabled]
  );

  return (
    <FormControlLabel
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
