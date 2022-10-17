import { FC, memo } from "react";
import useVendorNamesList from "../../customHooks/useVendorNamesList";
import VendorColumn from "./VendorColumn";

const VendorColumnList: FC = () => {
  const vendorNames = useVendorNamesList();

  return (
    <div className="justify-content-center row">
      <div className="shadow col-11 col-xl-10 p-0 justify-content-center text-center">
        {vendorNames.map(vendorName => (
          <VendorColumn
            key={`${vendorName}-VendorColumn`}
            vendorName={vendorName}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(VendorColumnList);
