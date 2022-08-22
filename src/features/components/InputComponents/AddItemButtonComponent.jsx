import { Fade, Collapse, Badge, Button } from "react-bootstrap";
import { memo, useCallback, useRef, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../addedSlice";
import PropTypes from "prop-types";

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

  return (
    <Button
      ref={target}
      size="lg"
      key={`Button-AddItemButtonComponent-${itemObj.name}`}
      onClick={clickHandler}
      className="btn btn-success d-block w-100 position-relative mb-2 fw-bold rounded-pill shadow custom-text-shadow-white">
      Add Item
      <Collapse
        in={show}
        timeout={500}
        key={`Collapse-AddItemButtonComponent-${itemObj.name}`}>
        <div key={`div-AddItemButtonComponent-${itemObj.name}`}>
          <Fade
            in={show}
            timeout={500}
            key={`Fade-AddItemButtonComponent-${itemObj.name}`}>
            <Badge
              bg="danger"
              className="d-block fw-light"
              key={`Badge-AddItemButtonComponent-${itemObj.name}`}>
              This Item Has Already Been Added!
            </Badge>
          </Fade>
        </div>
      </Collapse>
    </Button>
  );
}

AddItemButtonComponent.propTypes = {
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(AddItemButtonComponent);
