import type { FC } from "react";
import { memo } from "react";

import VendorIdProvider from "../../contexts/VendorIdProvider";
import useVendorIds from "../../hooks/useVendorIds";
import VendorColumn from "./VendorColumn";

const VendorColumnList: FC = () => {
  const vendorNames = useVendorIds();

  return (
    <div className="justify-content-center row">
      <div className="shadow col-11 col-xl-10 p-0 justify-content-center text-center">
        {vendorNames.map(vendorName => (
          <VendorIdProvider
            key={vendorName}
            vendorId={vendorName}>
            <VendorColumn key={`${vendorName}-VendorColumn`} />
          </VendorIdProvider>
        ))}
      </div>
    </div>
  );
};

export default memo(VendorColumnList);
