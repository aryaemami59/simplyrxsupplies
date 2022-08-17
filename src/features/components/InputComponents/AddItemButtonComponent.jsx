import { memo, useCallback, useRef, useState } from "react";
import { Fade, Collapse, Badge, Button } from "react-bootstrap";
import { shallowEqual } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
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

  const clickHandler = useCallback(() => {
    if (IfAddedToAllVendors) {
      setShow(true);
      setTimeout(() => setShow(false), 1500);
    } else {
      dispatch(addItems({ itemObj, vendors }));
    }
  }, [dispatch, itemObj, IfAddedToAllVendors, vendors]);

  return (
    <Button
      ref={target}
      size="lg"
      key={`${itemObj.name}-badge`}
      onClick={clickHandler}
      className="btn btn-success d-block w-100 position-relative mb-2 fw-bold">
      Add Item
      <Collapse in={show} timeout={500}>
        <div>
          <Fade in={show} timeout={500}>
            <Badge bg="danger" className="d-block fw-light">
              This Item Has Already Been Added!
            </Badge>
          </Fade>
        </div>
      </Collapse>
    </Button>
  );
}

export default memo(AddItemButtonComponent);
