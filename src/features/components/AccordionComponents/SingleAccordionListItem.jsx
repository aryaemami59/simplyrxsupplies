import { memo, useEffect, useCallback, useMemo, useRef } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addItems, checkIfItemAdded } from "../../../addedSlice";

function SingleAccordionListItem({ itemObj, vendorName }) {
  // const renders = useRef(0);
  // console.log("renders:", renders.current++);
  const dispatch = useDispatch();
  const ifAdded = useSelector(checkIfItemAdded(vendorName, itemObj));

  const clickHandler = useCallback(() => {
    dispatch(addItems(itemObj));
  }, [dispatch, itemObj]);

  useEffect(() => {
    // console.log("clickHandler changed");
  }, [clickHandler]);

  useEffect(() => {
    //   console.log("dispatch changed");
  }, [dispatch]);

  return (
    <ListGroup.Item
      role="button"
      className={ifAdded ? "text-decoration-line-through" : ""}
      onClick={clickHandler}>
      {itemObj.name}
    </ListGroup.Item>
  );
}

export default memo(SingleAccordionListItem);
