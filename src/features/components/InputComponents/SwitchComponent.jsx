import { memo } from "react";
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
    <div className="form-check form-switch d-flex align-items-center row cursor-pointer bg-outline-primary ps-5">
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(SwitchComponent));
