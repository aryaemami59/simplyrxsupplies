import { memo, useEffect, useCallback, useMemo, useRef } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addItems, checkIfItemAdded } from "../../../addedSlice";
import PropTypes from "prop-types";

function SingleAccordionListItem({ itemObj, vendorName }) {
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
    <Button
      variant={ifAdded ? "success" : "outline-primary"}
      onClick={clickHandler}>
      {itemObj.name}
    </Button>
  );
}

SingleAccordionListItem.propTypes = {
  vendorName: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(SingleAccordionListItem);
