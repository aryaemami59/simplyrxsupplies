import { ListGroupItem } from "reactstrap";
import { memo, useCallback, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectByVendor, addItems } from "../../../addedSlice";

function SingleListItem({ itemObj, vendorName, vendors }) {
  const dispatch = useDispatch();
  // console.log(vendorName);

  const addedItems = useSelector(selectByVendor(vendorName), (prev, next) => {
    return prev.includes(itemObj) || !next.includes(itemObj);
  });

  function clickHandler() {
    !addedItems.includes(itemObj) && dispatch(addItems({ itemObj, vendors }));
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

export default memo(SingleListItem);
