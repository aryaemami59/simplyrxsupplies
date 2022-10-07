import { MenuItem } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { ItemObjType, vendorNameType } from "../../../customTypes/types";
import {
  addItemsByVendor,
  checkIfItemAddedToOneVendor,
} from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const SingleDropDown: FC<Props> = ({ itemObj, vendorName }) => {
  const dispatch = useAppDispatch();
  const ifAddedToVendor = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemObj)
  );

  const clickHandler: MouseEventHandler<HTMLElement> = useCallback(() => {
    ifAddedToVendor || dispatch(addItemsByVendor({ itemObj, vendorName }));
  }, [dispatch, itemObj, vendorName, ifAddedToVendor]);

  return (
    <MenuItem
      className="text-wrap"
      key={itemObj.id}
      onClick={clickHandler}>
      {itemObj.name}
    </MenuItem>
  );
};

export default memo<Props>(SingleDropDown);
