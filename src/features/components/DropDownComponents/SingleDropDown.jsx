import { Dropdown } from "react-bootstrap";
import { memo, useCallback } from "react";
import { checkIfItemAddedToOneVendor, addItemsByVendor, } from "../../../addedSlice";
import { useAppDispatch, useAppSelector } from "../../../data/store";
const SingleDropDown = ({ itemObj, vendorName }) => {
    const dispatch = useAppDispatch();
    const ifAddedToVendor = useAppSelector(checkIfItemAddedToOneVendor(vendorName, itemObj));
    const clickHandler = useCallback(() => {
        ifAddedToVendor || dispatch(addItemsByVendor({ itemObj, vendorName }));
    }, [dispatch, itemObj, vendorName, ifAddedToVendor]);
    return (<Dropdown.Item as="button" className={`custom-text-shadow-white text-wrap border-bottom border-info text-info ${ifAddedToVendor ? "bg-info text-white" : ""}`} onClick={clickHandler}>
      {itemObj.name}
    </Dropdown.Item>);
};
export default memo(SingleDropDown);
