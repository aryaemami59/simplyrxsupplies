import { Fade, Collapse, Badge, Button } from "react-bootstrap";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../addedSlice";

function AddItemButtonComponent({ itemObj }) {
  const [show, setShow] = useState(false);
  const IfAddedToAllVendors = useSelector(checkIfAddedToAllVendors(itemObj));
  const vendors = useSelector(selectVendorsToAddTo(itemObj), shallowEqual);
  const dispatch = useDispatch();
  const target = useRef(null);

  const showBadge = useCallback(() => {
    setShow(true);
  }, []);
  const hideBadge = useCallback(() => {
    setShow(false);
    // setTimeout(() => setShow(false), 1500);
  }, []);

  const showThenHide = useCallback(() => {
    showBadge();
    setTimeout(hideBadge, 1500);
  }, [showBadge, hideBadge]);

  const clickHandler = useCallback(() => {
    IfAddedToAllVendors
      ? showThenHide()
      : dispatch(addItems({ itemObj, vendors }));
  }, [IfAddedToAllVendors, showThenHide, dispatch, itemObj, vendors]);

  // const clickHandler = useCallback(() => {
  //   if (IfAddedToAllVendors) {
  //     setShow(true);
  //     setTimeout(() => setShow(false), 1500);
  //   } else {
  //     dispatch(addItems({ itemObj, vendors }));
  //   }
  // }, [dispatch, itemObj, IfAddedToAllVendors, vendors]);

  return (
    <Button
      ref={target}
      size="lg"
      key={`Button-AddItemButtonComponent`}
      onClick={clickHandler}
      className="btn btn-success d-block w-100 position-relative mb-2 fw-bold">
      Add Item
      <Collapse in={show} timeout={500} key={`Collapse-AddItemButtonComponent`}>
        <div key={`div-AddItemButtonComponent`}>
          <Fade in={show} timeout={500} key={`Fade-AddItemButtonComponent`}>
            <Badge
              bg="danger"
              className="d-block fw-light"
              key={`Badge-AddItemButtonComponent`}>
              This Item Has Already Been Added!
            </Badge>
          </Fade>
        </div>
      </Collapse>
    </Button>
  );
}

export default memo(AddItemButtonComponent);
