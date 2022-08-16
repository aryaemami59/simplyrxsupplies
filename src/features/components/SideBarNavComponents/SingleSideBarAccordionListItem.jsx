import { Button } from "react-bootstrap";
import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItems, checkIfAddedToAllVendors } from "../../../addedSlice";
import PropTypes from "prop-types";

function SingleSideBarAccordionListItem({ targetId, itemObj }) {
  const dispatch = useDispatch();
  const ifAddedToAllVendors = useSelector(checkIfAddedToAllVendors(itemObj));
  const vendors = useSelector(state => state.item[itemObj.name]);

  const clickHandler = useCallback(() => {
    dispatch(addItems({ itemObj, vendors }));
  }, [dispatch, itemObj, vendors]);

  return (
    <Button
      variant={`${ifAddedToAllVendors ? "info text-white" : "outline-info"}`}
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
