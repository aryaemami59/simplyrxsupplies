import { Dropdown } from "react-bootstrap";
import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkIfItemAddedToOneVendor, addItemsByVendor, } from "../../../addedSlice";
const SingleDropDown = ({ itemObj, vendorName }) => {
    const dispatch = useDispatch();
    const ifAddedToVendor = useSelector(checkIfItemAddedToOneVendor(vendorName, itemObj));
    const clickHandler = useCallback(() => {
        ifAddedToVendor || dispatch(addItemsByVendor({ itemObj, vendorName }));
    }, [dispatch, itemObj, vendorName, ifAddedToVendor]);
    return (<Dropdown.Item as="button" className={`custom-text-shadow-white text-wrap border-bottom border-info text-info ${ifAddedToVendor ? "bg-info text-white" : ""}`} onClick={clickHandler}>
      {itemObj.name}
    </Dropdown.Item>);
};
// SingleDropDown.propTypes = {
//   vendorName: PropTypes.string,
//   itemObj: PropTypes.shape({
//     name: PropTypes.string,
//     itemNumber: PropTypes.string,
//     keywords: PropTypes.arrayOf(PropTypes.string),
//     nav: PropTypes.arrayOf(PropTypes.string),
//     vendors: PropTypes.arrayOf(PropTypes.string),
//     src: PropTypes.string,
//   }),
// };
export default memo(SingleDropDown);
