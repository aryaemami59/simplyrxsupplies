import type { FC } from "react";
import { memo } from "react";

import VendorIdProvider from "../../contexts/VendorIdProvider";
import useVendorIds from "../../hooks/useVendorIds";
import VendorColumn from "./VendorColumn";

const VendorColumnList: FC = () => {
  const vendorIds = useVendorIds();

  return (
    <div className="justify-content-center row">
      <div className="shadow col-11 col-xl-10 p-0 justify-content-center text-center">
        {vendorIds.map(vendorId => (
          <VendorIdProvider
            key={vendorId}
            vendorId={vendorId}>
            <VendorColumn key={`${vendorId}-VendorColumn`} />
          </VendorIdProvider>
        ))}
      </div>
    </div>
  );
};

export default memo(VendorColumnList);
