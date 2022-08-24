import { memo } from "react";
import { connect } from "react-redux";
import { setVendors } from "../../../addedSlice";
const SideBarSwitchComponent = ({ clickHandler, checked, itemObj, vendorName, }) => {
    return (<></>
    // <div className="form-check form-switch d-flex align-items-center row cursor-pointer bg-outline-primary ps-5 p-0 position-absolute top-0 start-0 bottom-0 justify-content-between">
    //   <input
    //     key={`${itemObj.name}-${vendorName}-SwitchComponent-`}
    //     onChange={clickHandler}
    //     className="form-check-input cursor-pointer"
    //     type="checkbox"
    //     role="switch"
    //     id={`${itemObj.name}-${vendorName}-SwitchComponent-`}
    //     checked={checked}
    //   />
    //   <label
    //     className="form-check-label cursor-pointer"
    //     htmlFor={`${itemObj.name}-${vendorName}-SwitchComponent-`}></label>
    // </div>
    );
};
const mapStateToProps = (state, ownProps) => {
    return {
        checked: state.item[ownProps.itemObj.name].includes(ownProps.vendorName),
        disabled: state.item[ownProps.itemObj.name].vendorsAdded.includes(ownProps.vendorName),
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clickHandler: () => {
            dispatch(setVendors({
                itemObj: ownProps.itemObj,
                vendorName: ownProps.vendorName,
            }));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(SideBarSwitchComponent));
