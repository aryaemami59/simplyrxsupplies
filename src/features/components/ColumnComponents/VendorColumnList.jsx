import VendorColumn from "./VendorColumn";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";

function VendorColumnList({ itemsAdded }) {
  return (
    <>
      {vendors.map((e, i) => (
        <VendorColumn
          officialVendorName={officialVendorNames[0][e]}
          key={`${officialVendorNames[0][e]}-VendorColumn`}
          vendorName={e}
          itemsAdded={itemsAdded.filter(f => f[e])}
        />
      ))}
    </>
  );
}

export default VendorColumnList;
