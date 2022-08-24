import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { memo } from "react";
import { setVendors } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";
const mapStateToProps = (state, ownProps) => {
    return {
        checked: state.item[ownProps.itemObj.name].vendorsToAdd.includes(ownProps.vendorName),
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
const connector = connect(mapStateToProps, mapDispatchToProps);
const SwitchComponent = ({ clickHandler, checked, itemObj, vendorName, disabled, }) => {
    return (<Form.Check type="switch" id={`${itemObj.name}-${vendorName}-SwitchComponent-SwitchComponent-${vendorName}`} disabled={disabled} className="d-flex align-items-center row bg-outline-primary w-100 pe-0" key={`div-SwitchComponent-${vendorName}`}>
      <Form.Check.Input disabled={disabled} onChange={clickHandler} checked={checked} className="col-1 custom-checkbox-bg cursor-pointer" key={`input-SwitchComponent-${vendorName}`}/>
      <Form.Check.Label key={`label-SwitchComponent-${vendorName}`} className="col pe-0" htmlFor={`${itemObj.name}-${vendorName}-SwitchComponent-SwitchComponent-${vendorName}`}>
        <VendorBadges disabled={disabled} clickHandler={clickHandler} vendorName={vendorName} itemObj={itemObj} key={`VendorBadges-SwitchComponent-${vendorName}`}/>
      </Form.Check.Label>
    </Form.Check>);
};
export default connector(memo(SwitchComponent));
