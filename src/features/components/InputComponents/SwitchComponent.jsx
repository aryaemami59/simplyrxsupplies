import { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { setVendors } from "../../../addedSlice";

function SwitchComponent({ clickHandler, checked }) {
  return (
    <>
      <div className="form-check form-switch">
        <input
          onChange={clickHandler}
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          // defaultChecked
          // checked
          checked={checked}
        />
        <label
          className="form-check-label"
          htmlFor="flexSwitchCheckChecked"></label>
      </div>
    </>
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
