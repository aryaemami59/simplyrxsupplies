import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";

import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import { toggleVendorForOneSearchResultItem } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { checkIfAddedToVendor, isVendorChecked } from "../../redux/selectors";
import { ItemIdAndVendorId } from "../../types/redux";

type Props = ItemIdAndVendorId;

const SideBarVendorBadges: FC<Props> = ({ itemId, vendorId }) => {
  const dispatch = useAppDispatch();
  const officialVendorName = useOfficialVendorName(vendorId);

  // const checked = useAppSelector(state =>
  //   checkVendorsToAdd(state, vendorId, itemId)
  // );
  const checked = useAppSelector(state =>
    isVendorChecked(state, itemId, vendorId)
  );

  // const disabled = useAppSelector(state =>
  //   checkIfAddedToAllVendors(state, itemId)
  // );
  const disabled = useAppSelector(state =>
    checkIfAddedToVendor(state, vendorId, itemId)
  );

  const clickHandler = useCallback(() => {
    dispatch(toggleVendorForOneSearchResultItem({ itemId, vendorId }));
  }, [dispatch, itemId, vendorId]);

  const control = useMemo(
    () => (
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={clickHandler}
        size="small"
      />
    ),
    [checked, clickHandler, disabled]
  );

  return (
    <FormControlLabel
      className="fs-7"
      control={control}
      disableTypography
      label={officialVendorName}
    />
  );
};

SideBarVendorBadges.propTypes = {
  itemId: PropTypes.number.isRequired,
  vendorId: PropTypes.number.isRequired,
};

export default memo<Props>(SideBarVendorBadges);
