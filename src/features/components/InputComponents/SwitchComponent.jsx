import { connect } from "react-redux";
import { memo } from "react";
import { setVendors } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";
import PropTypes from "prop-types";

function SwitchComponent({ clickHandler, checked, itemObj, vendorName }) {
  return (
    <div
      key={`div-SwitchComponent-${vendorName}`}
      className="form-check form-switch d-flex align-items-center row cursor-pointer bg-outline-primary ps-5">
      <input
        key={`input-SwitchComponent-${vendorName}`}
        onChange={clickHandler}
        className="form-check-input cursor-pointer col-1"
        type="checkbox"
        role="switch"
        id={`${itemObj.name}-${vendorName}-SwitchComponent-SwitchComponent-${vendorName}`}
        checked={checked}
      />
      <label
        key={`label-SwitchComponent-${vendorName}`}
        className="form-check-label cursor-pointer col"
        htmlFor={`${itemObj.name}-${vendorName}-SwitchComponent-SwitchComponent-${vendorName}`}>
        <VendorBadges
          clickHandler={clickHandler}
          vendorName={vendorName}
          itemObj={itemObj}
          key={`VendorBadges-SwitchComponent-${vendorName}`}
        />
      </label>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    checked: state.item[ownProps.itemObj.name].vendorsToAdd.includes(
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

SwitchComponent.propTypes = {
  clickHandler: PropTypes.func,
  checked: PropTypes.bool,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(SwitchComponent));
