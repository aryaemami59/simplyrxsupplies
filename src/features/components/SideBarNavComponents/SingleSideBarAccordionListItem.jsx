import { Button } from "react-bootstrap";
import { memo, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsObj,
  selectVendorsToAddTo,
} from "../../../addedSlice";
import PropTypes from "prop-types";
import SideBarVendorBadges from "./SideBarVendorBadges";
import { ButtonGroup } from "react-bootstrap";

function SingleSideBarAccordionListItem({ targetId, itemObj }) {
  const dispatch = useDispatch();
  const ifAddedToAllVendors = useSelector(checkIfAddedToAllVendors(itemObj));
  const vendors = useSelector(selectVendorsToAddTo(itemObj), shallowEqual);
  const vendorsObj = useSelector(selectVendorsObj, shallowEqual);

  const clickHandler = useCallback(() => {
    ifAddedToAllVendors && dispatch(addItems({ itemObj, vendors }));
  }, [dispatch, itemObj, vendors, ifAddedToAllVendors]);

  return (
    <>
      <Button
        size="lg"
        className="fw-bold"
        variant={`${ifAddedToAllVendors ? "info text-white" : "outline-info"}`}
        onClick={clickHandler}
        key={`${itemObj.name}-${targetId}-ListGroupItem-sidebar`}>
        {itemObj.name}
      </Button>
      <ButtonGroup size="sm" vertical>
        {itemObj.vendors.map(e => (
          <SideBarVendorBadges
            key={`SideBarVendorBadges-${itemObj.name}${e}`}
            itemObj={itemObj}
            officialVendorName={vendorsObj[e].officialName}
            vendorName={e}
          />
        ))}
      </ButtonGroup>
      {/* <ListGroup className="w- fs-6 fw-light">
        {itemObj.vendors.map(e => (
          <SwitchComponent
            key={`SwitchComponent-${itemObj.name}${e}`}
            itemObj={itemObj}
            vendorName={e}
          />
        ))}
      </ListGroup> */}
    </>
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
