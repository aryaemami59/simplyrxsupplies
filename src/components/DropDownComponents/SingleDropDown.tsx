import { MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import {
  VendorAndItemName,
  itemNames,
  vendorNames,
} from "../../custom_types/api";
import { addItemsByVendor } from "../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { checkIfItemAddedToOneVendor } from "../../Redux/selectors";

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
      disabled={ifAddedToVendor}
      className="text-wrap"
      key={itemName}
      onClick={clickHandler}>
      {itemName}
    </MenuItem>
  );
};

SingleDropDown.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
  vendorName: PropTypes.oneOf(vendorNames).isRequired,
};

export default memo<Props>(SingleDropDown);
