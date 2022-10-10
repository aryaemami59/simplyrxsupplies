import { MenuItem } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import {
  ItemName,
  ItemObjType,
  VendorNameType,
} from "../../../customTypes/types";
import {
  addItemsByVendor,
  checkIfItemAddedToOneVendor,
  selectItemObjByName,
} from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

type Props = {
  itemName: ItemName;
  // itemObj: ItemObjType;
  vendorName: VendorNameType;
};

const SingleDropDown: FC<Props> = ({ itemName, vendorName }) => {
  const dispatch = useAppDispatch();

  const itemObj = useAppSelector(selectItemObjByName(itemName));
  const ifAddedToVendor = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemObj)
  );

  const clickHandler: MouseEventHandler<HTMLElement> = useCallback(() => {
    ifAddedToVendor || dispatch(addItemsByVendor({ itemObj, vendorName }));
  }, [ifAddedToVendor, dispatch, itemObj, vendorName]);

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

export default memo<Props>(SingleDropDown);
