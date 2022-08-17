import { Button } from "react-bootstrap";
import { memo, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import officialVendorNames from "../../../data/officialVendorNames.json";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../addedSlice";
import PropTypes from "prop-types";
import SwitchComponent from "../InputComponents/SwitchComponent";
import { ListGroup } from "react-bootstrap";
import SideBarSwitchComponent from "./SideBarSwitchComponent";
import SideBarVendorBadges from "./SideBarVendorBadges";

function SingleSideBarAccordionListItem({ targetId, itemObj }) {
  const dispatch = useDispatch();
  const ifAddedToAllVendors = useSelector(checkIfAddedToAllVendors(itemObj));
  const vendors = useSelector(selectVendorsToAddTo(itemObj), shallowEqual);

  const clickHandler = useCallback(() => {
    dispatch(addItems({ itemObj, vendors }));
  }, [dispatch, itemObj, vendors]);

  return (
    <>
      <Button
        variant={`${ifAddedToAllVendors ? "info text-white" : "outline-info"}`}
        onClick={clickHandler}
        key={`${itemObj.name}-${targetId}-ListGroupItem-sidebar`}>
        {itemObj.name}
      </Button>
      {itemObj.vendors.map(e => (
        <SideBarVendorBadges
          key={`SideBarVendorBadges-${itemObj.name}${e}`}
          itemObj={itemObj}
          officialVendorName={officialVendorNames[e]}
          vendorName={e}
        />
      ))}
      {/* <ListGroup className="w- fs-6 fw-light">
        {itemObj.vendors.map(e => (
          <SwitchComponent
            key={`SwitchComponent-${itemObj.name}${e}`}
            itemObj={itemObj}
            officialVendorName={officialVendorNames[e]}
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
