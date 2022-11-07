import { Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import { FC, memo, useCallback } from "react";
import {
  VendorAndItemName,
  itemNames,
  vendorNames,
} from "../../custom_types/api";
import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import { setVendors } from "../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  checkVendorsToAdd,
  checkIfItemAddedToOneVendor,
} from "../../Redux/selectors";

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

  return (
    <FormControlLabel
      label={officialVendorName}
      control={
        <Checkbox
          checked={checked}
          disabled={disabled}
          onChange={clickHandler}
        />
      }
    />
  );
};

SideBarVendorBadges.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
  vendorName: PropTypes.oneOf(vendorNames).isRequired,
};

export default memo<Props>(SideBarVendorBadges);
