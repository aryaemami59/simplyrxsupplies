import { MenuItem } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useContext } from "react";
import { DarkMode } from "../../../App";
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
  const { darkTheme } = useContext(DarkMode);
  const dispatch = useAppDispatch();
  const ifAddedToVendor = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemObj)
  );

  const addedColor = darkTheme ? "bg-info text-white" : "bg-dark text-white";
  const border = darkTheme ? "border-info text-info" : "border-dark";

  const clickHandler: MouseEventHandler<HTMLElement> = useCallback(() => {
    ifAddedToVendor || dispatch(addItemsByVendor({ itemObj, vendorName }));
  }, [dispatch, itemObj, vendorName, ifAddedToVendor]);

  return (
    <MenuItem
      // as="button"
      // className={`custom-text-shadow-whit text-wrap border-bottom btn-info ${border} ${
      //   ifAddedToVendor && addedColor
      // }`}
      className="text-wrap"
      key={itemObj.id}
      onClick={clickHandler}>
      {itemObj.name}
    </MenuItem>
  );
};

export default memo<Props>(SingleDropDown);
