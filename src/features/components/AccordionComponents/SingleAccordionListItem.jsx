import { Button } from "react-bootstrap";
import { memo, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addItems,
  checkIfItemAdded,
  selectVendorsToAddTo,
} from "../../../addedSlice";
import PropTypes from "prop-types";

function SingleAccordionListItem({ itemObj, vendorName }) {
  const dispatch = useDispatch();
  const ifAdded = useSelector(checkIfItemAdded(vendorName, itemObj));
  const vendors = useSelector(selectVendorsToAddTo(itemObj), shallowEqual);

  const clickHandler = useCallback(() => {
    dispatch(addItems({ itemObj, vendors }));
  }, [dispatch, itemObj, vendors]);

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
