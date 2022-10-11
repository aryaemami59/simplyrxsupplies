import { FormControlLabel, Switch } from "@mui/material";
import { FC, memo, useCallback } from "react";
import { VendorAndItemName } from "../../../customTypes/types";
import {
  checkVendorsAdded,
  checkVendorsToAdd,
  selectVendorOfficialName,
  setVendors
} from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

type Props = VendorAndItemName;

const SwitchComponent: FC<Props> = ({ itemName, vendorName }) => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const dispatch = useAppDispatch();

  const checked = useAppSelector(checkVendorsToAdd(vendorName, itemName));

  const disabled = useAppSelector(checkVendorsAdded(vendorName, itemName));

  const clickHandler = useCallback(() => {
    dispatch(setVendors({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

  // const control = useMemo(
  //   () => (
  //     <Switch
  //       checked={checked}
  //       disabled={disabled}
  //       onChange={clickHandler}
  //     />
  //   ),
  //   [checked, clickHandler, disabled]
  // );

  return (
    <FormControlLabel
      checked={checked}
      disabled={disabled}
      onChange={clickHandler}
      disableTypography
      control={<Switch />}
      // control={control}
      label={officialVendorName}
    />
  );
};

export default memo<Props>(SwitchComponent);
