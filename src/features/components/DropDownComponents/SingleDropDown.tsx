import { Dropdown } from "react-bootstrap";
import { memo, useCallback, FC, useContext } from "react";
import {
  checkIfItemAddedToOneVendor,
  addItemsByVendor,
} from "../../../addedSlice";
import { itemInterface } from "../../../addedSlice";
import { useAppDispatch, useAppSelector } from "../../../data/store";
import { DarkMode } from "../../../App";

interface Props {
  itemObj: itemInterface;
  vendorName: string;
}

const SingleDropDown: FC<Props> = ({ itemObj, vendorName }): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const dispatch = useAppDispatch();
  const ifAddedToVendor = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemObj)
  );

  const addedColor = darkTheme ? "bg-info text-white" : "bg-dark text-white";

  const clickHandler = useCallback(() => {
    ifAddedToVendor || dispatch(addItemsByVendor({ itemObj, vendorName }));
  }, [dispatch, itemObj, vendorName, ifAddedToVendor]);

  return (
    <Dropdown.Item
      as="button"
      className={`custom-text-shadow-whit text-wrap border-bottom btn-info ${
        darkTheme ? "border-info text-info" : "border-dark"
      } ${ifAddedToVendor ? addedColor : ""}`}
      onClick={clickHandler}>
      {itemObj.name}
    </Dropdown.Item>
  );
};

export default memo(SingleDropDown);
