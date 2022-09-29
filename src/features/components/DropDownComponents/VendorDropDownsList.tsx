import { shallowEqual } from "react-redux";
import { memo, FC } from "react";
import { selectVendorsArr } from "../../../Redux/addedSlice";
import VendorDropDown from "./VendorDropDown";
import { useAppSelector } from "../../../Redux/hooks";

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
