import FormControlLabel from "@mui/material/FormControlLabel";
import type { SwitchProps } from "@mui/material/Switch";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo, useCallback } from "react";

import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import { toggledVendorForOneSearchResultItem } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { checkIfAddedToVendor, isVendorChecked } from "../../redux/selectors";

const inputProps: SwitchProps["inputProps"] = {
  className: "shadow",
} as const;

const control = (
  <Switch
    inputProps={inputProps}
    size="small"
  />
);

type Props = {
  visibleListId: number;
  vendorId: number;
};

const SwitchComponent: FC<Props> = ({ vendorId, visibleListId }) => {
  const officialVendorName = useOfficialVendorName(vendorId);

  const dispatch = useAppDispatch();

  const checked = useAppSelector(state =>
    isVendorChecked(state, visibleListId, vendorId)
  );

  const disabled = useAppSelector(state =>
    checkIfAddedToVendor(state, vendorId, visibleListId)
  );

  const clickHandler = useCallback(() => {
    dispatch(
      toggledVendorForOneSearchResultItem({ itemId: visibleListId, vendorId })
    );
  }, [dispatch, vendorId, visibleListId]);

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
  vendorId: PropTypes.number.isRequired,
  visibleListId: PropTypes.number.isRequired,
};

export default memo<Props>(SwitchComponent);
