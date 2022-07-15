import VendorColumn from "./VendorColumn";
import vendors from "../../../app/vendorNames.json";
import officialVendorNames from "../../../app/officialVendorNames.json";

function VendorColumnList(props) {
  return (
    <>
      {vendors.map((e, i) => (
        <VendorColumn
          officialVendorName={officialVendorNames[0][e]}
          key={`${officialVendorNames[0][e]}-VendorColumn`}
          vendorName={e}
          itemsAdded={props.itemsAdded.filter(f => f[e])}
        />
      ))}
    </>
  );
}

export default VendorColumnList;
