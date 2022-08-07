import { ListGroupItem } from "reactstrap";
import { memo } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  selectByVendor,
  addItems,
  selectByVendorsNotAdded,
} from "../../../addedSlice";

function SingleAccordionListItem({ itemObj, vendorName, vendors }) {
  const dispatch = useDispatch();
  const notAddedVendors = useSelector(
    selectByVendorsNotAdded(vendors, itemObj),
    shallowEqual
  );

  const addedItems = useSelector(selectByVendor(vendorName), (prev, next) => {
    return prev.includes(itemObj) || !next.includes(itemObj);
  });

  function clickHandler() {
    notAddedVendors.length && dispatch(addItems({ itemObj, notAddedVendors }));
  }
  // const dispatch = useDispatch();
  // const addedItems = useSelector(selectByVendor(vendorName), (prev, next) => {
  //   return !prev.includes(itemObj) && !next.includes(itemObj);
  // });

  // function clickHandler() {
  //   dispatch(addItems({ itemObj, vendors }));
  // }

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
