import { memo, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setVendors } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";

function SwitchComponent({
  clickHandler,
  checked,
  itemObj,
  officialVendorName,
  vendorName,
}) {
  return (
    <div className="form-check form-switch d-flex flex-row align-items-center float-start row cursor-pointer bg-outline-primary">
      <input
        key={`${itemObj.name}-${vendorName}-SwitchComponent-`}
        onChange={clickHandler}
        className="form-check-input col-6 cursor-pointer"
        type="checkbox"
        role="switch"
        id={`${itemObj.name}-${vendorName}-SwitchComponent-`}
        checked={checked}
      />
      <label
        className="form-check-label cursor-pointer"
        htmlFor={`${itemObj.name}-${vendorName}-SwitchComponent-`}>
        <VendorBadges
          clickHandler={clickHandler}
          officialVendorName={officialVendorName}
          vendorName={vendorName}
          itemObj={itemObj}
          key={`${itemObj.name}-Badge-VendorBadges`}
        />
      </label>
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

export default connect(mapStateToProps, mapDispatchToProps)(SwitchComponent);
