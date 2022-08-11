import { memo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItems, checkIfAddedToAllVendors } from "../../../addedSlice";
import PropTypes from "prop-types";

function SingleSideBarAccordionListItem({ targetId, itemObj }) {
  const dispatch = useDispatch();
  const ifAddedToAllVendors = useSelector(
    checkIfAddedToAllVendors(itemObj.vendors, itemObj)
  );

  const clickHandler = useCallback(() => {
    dispatch(addItems(itemObj));
  }, [dispatch, itemObj]);

  return (
    <Button
      role="button"
      variant={ifAddedToAllVendors ? "success" : "outline-primary"}
      onClick={clickHandler}
      key={`${itemObj.name}-${targetId}-ListGroupItem-sidebar`}>
      {itemObj.name}
    </Button>
  );
}

SingleSideBarAccordionListItem.propTypes = {
  targetId: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(SingleSideBarAccordionListItem);
