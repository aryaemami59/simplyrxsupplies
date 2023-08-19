import FormControlLabel from "@mui/material/FormControlLabel";
import type { SwitchProps } from "@mui/material/Switch";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo, useCallback } from "react";

import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import { setVendors } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { checkVendorsAdded, checkVendorsToAdd } from "../../redux/selectors";
import type { VendorAndItemName } from "../../types/aa";
import { itemNames, vendorNames } from "../../types/aa";
import { VendorName } from "../../types/api";

const inputProps: SwitchProps["inputProps"] = {
  className: "shadow",
} as const;

const control = (
  <Switch
    inputProps={inputProps}
    size="small"
  />
);

type Props = VendorAndItemName & {
  vendors: VendorName[];
};

const SwitchComponent: FC<Props> = ({ itemName, vendorName, vendors }) => {
  const officialVendorName = useOfficialVendorName(vendorName);
  // const vendors =

  const dispatch = useAppDispatch();

  const checked = useAppSelector(checkVendorsToAdd(vendorName, itemName));

  const disabled = useAppSelector(checkVendorsAdded(vendorName, itemName));

  const clickHandler = useCallback(() => {
    dispatch(setVendors({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

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
  );
};

SwitchComponent.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
  vendorName: PropTypes.oneOf(vendorNames).isRequired,
};

export default memo<Props>(SwitchComponent);
