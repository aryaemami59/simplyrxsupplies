import { useSelector, shallowEqual } from "react-redux";
import { memo } from "react";
import { selectVendorsArr } from "../../../addedSlice";
import VendorDropDown from "./VendorDropDown";
const VendorDropDownsList = () => {
    const vendors = useSelector(selectVendorsArr, shallowEqual);
    return (<>
      {vendors.map((e) => (<VendorDropDown key={`${e}-VendorDropDownsList-VendorDropDown`} vendorName={e}/>))}
    </>);
};
export default memo(VendorDropDownsList);
