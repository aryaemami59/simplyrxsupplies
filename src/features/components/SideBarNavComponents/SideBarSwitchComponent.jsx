import { memo } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { setVendors } from "../../../addedSlice";
// import SideBarVendorBadges from "./SideBarVendorBadges";

function SideBarSwitchComponent({
  clickHandler,
  checked,
  itemObj,
  vendorName,
}) {
  return (
    <div className="form-check form-switch d-flex align-items-center row cursor-pointer bg-outline-primary ps-5 position-absolute top-0">
      <input
        key={`${itemObj.name}-${vendorName}-SwitchComponent-`}
        onChange={clickHandler}
        className="form-check-input cursor-pointer col-1"
        type="checkbox"
        role="switch"
        id={`${itemObj.name}-${vendorName}-SwitchComponent-`}
        checked={checked}
      />
      <label
        className="form-check-label cursor-pointer col"
        htmlFor={`${itemObj.name}-${vendorName}-SwitchComponent-`}></label>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    checked: state.item[ownProps.itemObj.name].includes(ownProps.vendorName),
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
)(memo(SideBarSwitchComponent));
