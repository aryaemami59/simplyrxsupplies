import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { memo } from "react";
import { setVendors } from "../../../addedSlice";
import PropTypes from "prop-types";

function SideBarVendorBadges({
  vendorName,
  itemObj,
  clickHandler,
  checked,
  disabled,
  officialVendorName,
}) {
  return (
    <Form.Check
      type="checkbox"
      className="text-info"
      id={`Form.Check-SideBarVendorBadges-${itemObj.name}-${vendorName}`}
      key={`${itemObj.name}-Badge-SideBarVendorBadges-`}>
      <Form.Check.Input
        disabled={disabled}
        onChange={clickHandler}
        checked={checked}
        className="custom-checkbox-bg cursor-pointer"
        type="checkbox"
        key={`Form.Check.Input-SideBarVendorBadges-${itemObj.name}`}
      />
      <Form.Check.Label
        className="cursor-pointer"
        htmlFor={`Form.Check-SideBarVendorBadges-${itemObj.name}-${vendorName}`}>
        {officialVendorName}
      </Form.Check.Label>
    </Form.Check>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    checked: state.item[ownProps.itemObj.name].vendorsToAdd.includes(
      ownProps.vendorName
    ),
    disabled: state.item[ownProps.itemObj.name].vendorsAdded.includes(
      ownProps.vendorName
    ),
    officialVendorName:
      state.added.vendorsObj[ownProps.vendorName].officialName,
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
  officialVendorName: PropTypes.string,
  clickHandler: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
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
