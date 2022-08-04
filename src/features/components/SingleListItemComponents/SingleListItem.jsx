import { ListGroupItem } from "reactstrap";
import { memo, useCallback, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItems,
  selectAllAddedNames,
  selectAllAdded,
  selectVendorAdded,
} from "../../../addedSlicekk";

function SingleListItem({ itemsAdded, onAdd, itemObj, vendorAddedNames }) {
  // const vendorAddedNames = vendorAdded.map(({ name }) => name);

  useEffect(() => {}, [itemsAdded.length, vendorAddedNames]);
  // const itemsAddedMemo = useMemo(() => {
  //   return itemsAdded;
  // }, [itemsAdded.length]);

  const clickHandler = useCallback(() => {
    return !itemsAdded.includes(itemObj) && onAdd(itemObj);
  }, [itemsAdded, onAdd, itemObj]);

  return (
    <ListGroupItem
      role="button"
      className={
        vendorAddedNames.includes(itemObj.name)
          ? "text-decoration-line-through"
          : ""
      }
      // className={
      //   itemsAdded.includes(itemObj) ? "text-decoration-line-through" : ""
      // }
      onClick={clickHandler}>
      {itemObj.name}
    </ListGroupItem>
  );
}

// export default memo(SingleListItem);
export default memo(
  SingleListItem,
  (prev, next) => prev.itemsAdded.length === next.itemsAdded.length
);
