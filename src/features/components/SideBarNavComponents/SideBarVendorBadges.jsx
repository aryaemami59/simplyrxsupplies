import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { memo } from "react";
import PropTypes from "prop-types";
import { setVendors, checkIfAddedToOneVendor } from "../../../addedSlice";
import { connect } from "react-redux";

function SideBarVendorBadges({
  vendorName,
  itemObj,
  officialVendorName,
  clickHandler,
}) {
  const ifAdded = useSelector(checkIfAddedToOneVendor(itemObj, vendorName));

  return (
    <Button
      size="sm"
      type="checkbox"
      onClickCapture={clickHandler}
      className={`"w-100 fw-lighter position-relative ps-0" ${
        ifAdded ? "fw-bold" : ""
      } `}
      variant={
        ifAdded ? "outline-primary text-white" : "outline-primary text-white-50"
      }
      key={`${itemObj.name}-Badge-SideBarVendorBadges-`}>
      {officialVendorName}
      {/* <SideBarSwitchComponent
        itemObj={itemObj}
        vendorName={vendorName}
        key={`SideBarSwitchComponent-`} */}
      {/* /> */}
    </Button>
  );
}

SideBarVendorBadges.propTypes = {
  vendorName: PropTypes.string,
  officialVendorName: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

const mapStateToProps = (state, ownProps) => {
  return {
    checked: state.item[ownProps.itemObj.name].vendorsAdded.includes(
      ownProps.vendorName
    ),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clickHandler: () => {
      dispatch(
        setVendors({
          itemObj: ownProps.itemObj,
          vendorName: ownProps.vendorName,
        })
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(SideBarVendorBadges));
