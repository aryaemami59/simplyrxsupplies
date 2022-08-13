import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { addItems, checkIfItemAdded } from "../../../addedSlice";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";

function SingleDropDown({ itemObj, vendorName }) {
  const dispatch = useDispatch();
  const ifAdded = useSelector(checkIfItemAdded(vendorName, itemObj));

  const clickHandler = useCallback(() => {
    dispatch(addItems(itemObj));
  }, [dispatch, itemObj]);

  return (
    <Dropdown.Item
      variant="dark"
      className={`text-wrap border-bottom border-info text-info ${
        ifAdded ? "bg-info text-white" : ""
      }`}
      onClick={clickHandler}>
      {itemObj.name}
    </Dropdown.Item>
  );
}

SingleDropDown.propTypes = {
  onAdd: PropTypes.func,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
  }),
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
};

export default memo(SingleDropDown);
