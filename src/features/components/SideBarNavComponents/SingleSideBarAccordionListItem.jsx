import { Button, ButtonGroup } from "react-bootstrap";
import { memo, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../addedSlice";
import SideBarVendorBadges from "./SideBarVendorBadges";
import PropTypes from "prop-types";

function SingleSideBarAccordionListItem({ category, itemObj }) {
  const dispatch = useDispatch();
  const ifAddedToAllVendors = useSelector(checkIfAddedToAllVendors(itemObj));
  const vendors = useSelector(selectVendorsToAddTo(itemObj), shallowEqual);

  const clickHandler = useCallback(() => {
    ifAddedToAllVendors || dispatch(addItems({ itemObj, vendors }));
  }, [dispatch, itemObj, vendors, ifAddedToAllVendors]);

  return (
    <>
      <Button
        size="lg"
        disabled={ifAddedToAllVendors}
        className="fw-bold"
        variant={`${
          ifAddedToAllVendors ? "info text-white" : "outline-info"
        } custom-text-shadow-white-50`}
        onClick={clickHandler}
        key={`${itemObj.name}-${category}-ListGroupItem-sidebar`}>
        {itemObj.name}
      </Button>
      <ButtonGroup
        key={`ButtonGroup-SingleSideBarAccordionListItem-${itemObj.name}-${category}`}
        size="sm"
        vertical>
        {itemObj.vendors.map(e => (
          <SideBarVendorBadges
            key={`SideBarVendorBadges-${itemObj.name}${e}`}
            itemObj={itemObj}
            vendorName={e}
          />
        ))}
      </ButtonGroup>
    </>
  );
}

SingleSideBarAccordionListItem.propTypes = {
  category: PropTypes.string,
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
