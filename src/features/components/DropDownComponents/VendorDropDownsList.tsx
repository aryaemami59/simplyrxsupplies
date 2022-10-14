import { FC, memo } from "react";
import { shallowEqual } from "react-redux";
import { selectVendorsArr } from "../../../Redux/selectors";
import { useAppSelector } from "../../../Redux/hooks";
import VendorDropDown from "./VendorDropDown";

const VendorDropDownsList: FC = () => {
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
