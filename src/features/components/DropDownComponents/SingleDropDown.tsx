import { Dropdown } from "react-bootstrap";
import { memo, useCallback, FC, useContext, MouseEventHandler } from "react";
import {
  checkIfItemAddedToOneVendor,
  addItemsByVendor,
} from "../../../Redux/addedSlice";
import { DarkMode } from "../../../App";
import { ItemObjType, vendorNameType } from "../../../customTypes/types";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const SingleDropDown: FC<Props> = ({ itemObj, vendorName }): JSX.Element => {
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
    <Dropdown.Item
      as="button"
      className={`custom-text-shadow-whit text-wrap border-bottom btn-info ${border} ${
        ifAddedToVendor && addedColor
      }`}
      onClick={clickHandler}>
      {itemObj.name}
    </Dropdown.Item>
  );
};

export default memo<Props>(SingleDropDown);
