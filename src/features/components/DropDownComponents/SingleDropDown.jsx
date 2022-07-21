import { DropdownItem } from "reactstrap";
import { memo } from "react";
import PropTypes from "prop-types";

function SingleDropDown({ onAdd, itemObj, itemsAdded }) {
  return (
    <DropdownItem
      className={
        itemsAdded.includes(itemObj) ? "text-decoration-line-through" : ""
      }
      onClick={() => !itemsAdded.includes(itemObj) && onAdd(itemObj)}>
      {itemObj.name}
    </DropdownItem>
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
