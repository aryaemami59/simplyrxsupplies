import type { FC } from "react";
import { memo } from "react";

import useVendorIds from "../../hooks/useVendorIds";
import VendorDropDown from "./VendorDropDown";

const VendorDropDownsList: FC = () => {
  const vendorIds = useVendorIds();

  return (
    <>
      {vendorIds.map(vendorId => (
        <VendorDropDown
          key={`${vendorId}-VendorDropDownsList-VendorDropDown`}
          vendorId={vendorId}
        />
      ))}
    </>
  );
};

export default memo(VendorDropDownsList);
