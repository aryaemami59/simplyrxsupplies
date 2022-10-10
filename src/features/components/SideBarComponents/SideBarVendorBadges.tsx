import { Checkbox, FormControlLabel } from "@mui/material";
import { FC, memo, useCallback } from "react";
import { VendorAndItemName } from "../../../customTypes/types";
import {
  checkIfItemAddedToOneVendor,
  checkVendorsToAdd,
  selectVendorOfficialName,
  setVendors,
} from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

type Props = VendorAndItemName;

const SideBarVendorBadges: FC<Props> = ({ vendorName, itemName }) => {
  const dispatch = useAppDispatch();
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

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

export default memo<Props>(SideBarVendorBadges);
