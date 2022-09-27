import { shallowEqual } from "react-redux";
import { memo } from "react";
import { selectVendorsArr } from "../../../addedSlice";
import VendorDropDown from "./VendorDropDown";
import { useAppSelector } from "../../../data/store";
const VendorDropDownsList = () => {
    const vendors = useAppSelector(selectVendorsArr, shallowEqual);
    return (<>
      {vendors.map(e => (<VendorDropDown key={`${e}-VendorDropDownsList-VendorDropDown`} vendorName={e}/>))}
    </>);
};
export default memo(VendorDropDownsList);
