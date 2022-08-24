import { useSelector, shallowEqual } from "react-redux";
import { memo, FC } from "react";
import { selectVendorsArr } from "../../../addedSlice";
import VendorDropDown from "./VendorDropDown";

const VendorDropDownsList: FC = (): JSX.Element => {
  const vendors = useSelector(selectVendorsArr, shallowEqual);

  return (
    <>
      {vendors.map((e) => (
        <VendorDropDown
          key={`${e}-VendorDropDownsList-VendorDropDown`}
          vendorName={e}
        />
      ))}
    </>
  );
};

export default memo(VendorDropDownsList);
