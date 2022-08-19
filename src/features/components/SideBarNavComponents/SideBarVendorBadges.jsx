import { Button } from "react-bootstrap";
import { useSelector, connect } from "react-redux";
import { memo } from "react";
import {
  setVendors,
  checkIfAddedToOneVendor,
  selectVendorOfficialName,
} from "../../../addedSlice";
import PropTypes from "prop-types";

function SideBarVendorBadges({ vendorName, itemObj, clickHandler }) {
  const ifAdded = useSelector(checkIfAddedToOneVendor(itemObj, vendorName));
  const officialVendorName = useSelector(selectVendorOfficialName(vendorName));

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
    </Button>
  );
}

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

SideBarVendorBadges.propTypes = {
  vendorName: PropTypes.string,
  clickHandler: PropTypes.func,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(SideBarVendorBadges));
