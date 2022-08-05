import { ListGroupItem, Badge, Container } from "reactstrap";
import { memo, useCallback, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectByVendor,
  addItems,
  selectByMultipleVendors,
  selectAllAdded,
} from "../../../addedSlice";

function SingleListItem({ itemObj, vendorName, vendors }) {
  const dispatch = useDispatch();
  // console.log(mm);
  // mm[0].length !== 0 && console.log(mm, itemObj);
  // console.log(vendorName);
  // const addedItems = useSelector(selectByVendor())
  const addedItems = useSelector(selectByVendor(vendorName), (prev, next) => {
    // console.log(prev)
    return !prev.includes(itemObj) && !next.includes(itemObj);
    // return prev.includes(itemObj) || !next.includes(itemObj);
  });
  // const mm = useSelector(selectAllAdded);
  // const multipleVendors = addedItems.length
  //   ? vendors.map(e => e[addedItems])
  //   : [];
  // console.log(multipleVendors);
  // console.log(addedItems)

  function clickHandler() {
    // !addedItems.includes(itemObj) &&
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
      {/* {vendors.map(e => (
        <Container>
          <Badge key={e} color="primary" className="d-inline-block ">
            {e}
          </Badge>
        </Container>
      ))} */}
    </ListGroupItem>
  );
}

export default memo(SingleListItem);
