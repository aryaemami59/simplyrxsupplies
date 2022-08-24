import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { memo } from "react";
import { setVendors, selectVendorOfficialName, } from "../../../addedSlice";
import { useAppSelector } from "../../../data/store";
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
const SideBarVendorBadges = ({ vendorName, itemObj, clickHandler, checked, disabled, }) => {
    const officialVendorName = useAppSelector(selectVendorOfficialName(vendorName));
    return (<Form.Check type="checkbox" className="text-info custom-text-shadow-white" id={`Form.Check-SideBarVendorBadges-${itemObj.name}-${vendorName}`} key={`${itemObj.name}-Badge-SideBarVendorBadges-`}>
      <Form.Check.Input disabled={disabled} onChange={clickHandler} checked={checked} className="custom-checkbox-bg cursor-pointer" type="checkbox" key={`Form.Check.Input-SideBarVendorBadges-${itemObj.name}`}/>
      <Form.Check.Label className="cursor-pointer" htmlFor={`Form.Check-SideBarVendorBadges-${itemObj.name}-${vendorName}`}>
        {officialVendorName}
      </Form.Check.Label>
    </Form.Check>);
};
export default connector(memo(SideBarVendorBadges));
