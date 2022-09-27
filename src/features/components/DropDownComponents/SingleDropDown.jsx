import { Dropdown } from "react-bootstrap";
import { memo, useCallback, useContext } from "react";
import { checkIfItemAddedToOneVendor, addItemsByVendor, } from "../../../addedSlice";
import { useAppDispatch, useAppSelector } from "../../../data/store";
import { DarkMode } from "../../../App";
const SingleDropDown = ({ itemObj, vendorName }) => {
    const { darkTheme } = useContext(DarkMode);
    const dispatch = useAppDispatch();
    const ifAddedToVendor = useAppSelector(checkIfItemAddedToOneVendor(vendorName, itemObj));
    const addedColor = darkTheme ? "bg-info text-white" : "bg-dark text-white";
    const clickHandler = useCallback(() => {
        ifAddedToVendor || dispatch(addItemsByVendor({ itemObj, vendorName }));
    }, [dispatch, itemObj, vendorName, ifAddedToVendor]);
    return (<Dropdown.Item as="button" className={`custom-text-shadow-whit text-wrap border-bottom btn-info ${darkTheme ? "border-info text-info" : "border-dark"} ${ifAddedToVendor ? addedColor : ""}`} onClick={clickHandler}>
      {itemObj.name}
    </Dropdown.Item>);
};
export default memo(SingleDropDown);
