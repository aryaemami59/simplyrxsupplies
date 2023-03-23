import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo, useCallback } from "react";
import { setVendors } from "../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { checkVendorsAdded, checkVendorsToAdd } from "../../Redux/selectors";
import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import type { VendorAndItemName } from "../../types/api";
import { itemNames, vendorNames } from "../../types/api";

const control = (
  <Switch
    size="small"
    // className="fs-6"
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    // style={{ width: "48px", height: "48px" }}
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    inputProps={{
      className: "shadow",
      // style: { width: "12px", height: "12px" },
    }}
  />
);

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
      className="p-0 fs-7"
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
