import { MenuItem } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { VendorAndItemName } from "../../../customTypes/types";
import { addItemsByVendor } from "../../../Redux/addedSlice";
import { checkIfItemAddedToOneVendor } from "../../../Redux/selectors";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

type Props = VendorAndItemName;

const SingleDropDown: FC<Props> = ({ itemName, vendorName }) => {
  const dispatch = useAppDispatch();

  const ifAddedToVendor = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemName)
  );

  const clickHandler: MouseEventHandler<HTMLElement> = useCallback(() => {
    ifAddedToVendor || dispatch(addItemsByVendor({ itemName, vendorName }));
  }, [ifAddedToVendor, dispatch, itemName, vendorName]);

  return (
    <MenuItem
      autoFocus
      disabled={ifAddedToVendor}
      className="text-wrap"
      key={itemName}
      onClick={clickHandler}>
      {itemName}
    </MenuItem>
  );
};

export default memo<Props>(SingleDropDown);
