import { Dropdown } from "react-bootstrap";
import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItems, checkIfItemAdded } from "../../../addedSlice";
import PropTypes from "prop-types";

function SingleDropDown({ itemObj, vendorName }) {
  const dispatch = useDispatch();
  const ifAdded = useSelector(checkIfItemAdded(vendorName, itemObj));

  const clickHandler = useCallback(() => {
    dispatch(addItems(itemObj));
  }, [dispatch, itemObj]);

  return (
    <Dropdown.Item
      variant="dark"
      as="button"
      className={`text-wrap border-bottom border-info text-info ${
        ifAdded ? "bg-info text-white" : ""
      }`}
      onClick={clickHandler}>
      {itemObj.name}
    </Dropdown.Item>
  );
}

SingleDropDown.propTypes = {
  vendorName: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(SingleDropDown);
