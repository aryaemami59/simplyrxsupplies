import { DropdownItem } from "reactstrap";
import { memo, useEffect, useContext, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { AddedContext } from "../../../App";

function SingleDropDown({ onAdd, itemObj }) {
  const itemsAdded = useContext(AddedContext);
  const renderCount = useRef(0);
  // console.log("SingleDropDown");
  // console.log(itemObj);

  const clickHandler = useCallback(() => {
    return !itemsAdded.includes(itemObj) && onAdd(itemObj);
  }, []);

  useEffect(() => {
    // console.log("SingleDropDown");
    renderCount.current = renderCount.current + 1;
    console.log(renderCount.current);
  });
  return (
    <DropdownItem
      className={
        itemsAdded.includes(itemObj) ? "text-decoration-line-through" : ""
      }
      onClick={clickHandler}>
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
