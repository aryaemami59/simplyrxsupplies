import PropTypes from "prop-types";
import { FormControlLabel, Switch } from "@mui/material";
import type { FC } from "react";
import { memo, useCallback } from "react";
import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import { setVendors } from "../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { checkVendorsToAdd, checkVendorsAdded } from "../../Redux/selectors";
import type { VendorAndItemName } from "../../custom_types/api";
import { itemNames, vendorNames } from "../../custom_types/api";

const control = <Switch />;

type Props = VendorAndItemName;

const SwitchComponent: FC<Props> = ({ itemName, vendorName }) => {
  const officialVendorName = useOfficialVendorName(vendorName);

  const dispatch = useAppDispatch();

  const checked = useAppSelector(checkVendorsToAdd(vendorName, itemName));

  const disabled = useAppSelector(checkVendorsAdded(vendorName, itemName));

  const clickHandler = useCallback(() => {
    dispatch(setVendors({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

  return (
    <FormControlLabel
      checked={checked}
      disabled={disabled}
      onChange={clickHandler}
      disableTypography
      control={control}
      label={officialVendorName}
    />
  );
};

SwitchComponent.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
  vendorName: PropTypes.oneOf(vendorNames).isRequired,
};

export default memo<Props>(SwitchComponent);
