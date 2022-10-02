import { FC, memo } from "react";
import { shallowEqual } from "react-redux";
import { selectVendorsArr } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import VendorDropDown from "./VendorDropDown";

const VendorDropDownsList: FC = (): JSX.Element => {
  const vendors = useAppSelector(selectVendorsArr, shallowEqual);

  return (
    <>
      {vendors.map(vendorName => (
        <VendorDropDown
          key={`${vendorName}-VendorDropDownsList-VendorDropDown`}
          vendorName={vendorName}
        />
      ))}
    </>
  );
};

export default memo(VendorDropDownsList);
