import VendorColumn from "./VendorColumn";
import vendors from "../../../data/vendors.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import { memo } from "react";

function VendorColumnList() {
  return (
    <>
      {vendors.map(e => (
        <VendorColumn
          officialVendorName={officialVendorNames[e]}
          key={`${officialVendorNames[e]}-VendorColumn`}
          vendorName={e}
        />
      ))}
    </>
  );
}

export default memo(VendorColumnList);
