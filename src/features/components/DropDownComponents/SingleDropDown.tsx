import { Dropdown } from "react-bootstrap";
import { memo, useCallback, FC } from "react";
import {
  checkIfItemAddedToOneVendor,
  addItemsByVendor,
} from "../../../addedSlice";
import { itemInterface } from "../../../addedSlice";
import { useAppDispatch, useAppSelector } from "../../../data/store";

interface Props {
  itemObj: itemInterface;
  vendorName: string;
}

const SingleDropDown: FC<Props> = ({ itemObj, vendorName }): JSX.Element => {
  const dispatch = useAppDispatch();
  const ifAddedToVendor = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemObj)
  );

  const clickHandler = useCallback(() => {
    ifAddedToVendor || dispatch(addItemsByVendor({ itemObj, vendorName }));
  }, [dispatch, itemObj, vendorName, ifAddedToVendor]);

  return (
    <Dropdown.Item
      as="button"
      className={`custom-text-shadow-white text-wrap border-bottom border-info text-info ${
        ifAddedToVendor ? "bg-info text-white" : ""
      }`}
      onClick={clickHandler}>
      {itemObj.name}
    </Dropdown.Item>
  );
};

export default memo(SingleDropDown);
