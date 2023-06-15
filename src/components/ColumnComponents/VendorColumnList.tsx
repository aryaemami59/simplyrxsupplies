import type { FC } from "react";
import { memo } from "react";

import VendorNameProvider from "../../contexts/VendorNameProvider";
import useVendorNamesList from "../../hooks/useVendorNamesList";
import VendorColumn from "./VendorColumn";

const VendorColumnList: FC = () => {
  const vendorNames = useVendorNamesList();

  return (
    <div className="justify-content-center row">
      <div className="shadow col-11 col-xl-10 p-0 justify-content-center text-center">
        {vendorNames.map(vendorName => (
          <VendorNameProvider
            vendorName={vendorName}
            key={vendorName}>
            <VendorColumn key={`${vendorName}-VendorColumn`} />
          </VendorNameProvider>
        ))}
      </div>
    </div>
  );
};

export default memo(VendorColumnList);
