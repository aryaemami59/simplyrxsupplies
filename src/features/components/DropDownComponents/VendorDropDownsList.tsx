import { FC, memo } from "react";
import useVendorNamesList from "../../customHooks/useVendorNamesList";
import VendorDropDown from "./VendorDropDown";

const VendorDropDownsList: FC = () => {
  const vendorNames = useVendorNamesList();

  return (
    <>
      {vendorNames.map(vendorName => (
        <VendorDropDown
          key={`${vendorName}-VendorDropDownsList-VendorDropDown`}
          vendorName={vendorName}
        />
      ))}
    </>
  );
};

export default memo(VendorDropDownsList);
