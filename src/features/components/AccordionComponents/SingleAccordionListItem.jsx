import { ListGroupItem } from "reactstrap";
import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectByVendor, addItems } from "../../../addedSlice";

function SingleAccordionListItem({ itemObj, vendorName, vendors }) {
  const dispatch = useDispatch();
  const addedItems = useSelector(selectByVendor(vendorName), (prev, next) => {
    return !prev.includes(itemObj) && !next.includes(itemObj);
  });

  function clickHandler() {
    dispatch(addItems({ itemObj, vendors }));
  }

  return (
    <ListGroupItem
      role="button"
      className={
        addedItems.includes(itemObj) ? "text-decoration-line-through" : ""
      }
      onClick={clickHandler}>
      {itemObj.name}
    </ListGroupItem>
  );
}

export default memo(SingleAccordionListItem);
