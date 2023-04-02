import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback } from "react";
import { addItemsByVendor } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { checkIfItemAddedToOneVendor } from "../../redux/selectors";
import type { VendorAndItemName } from "../../types/api";
import { itemNames, vendorNames } from "../../types/api";

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
