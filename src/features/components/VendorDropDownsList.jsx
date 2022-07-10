import VendorDropDown from "./VendorDropDown";

function VendorDropDownsList() {
  const vendors = [
    "McKesson",
    "OrderInsite",
    "GNFR",
    "signOrderCatalog",
    "vaxServe",
    "medSurge",
    "covap",
    "FORS",
  ];
  return (
    <>
      {vendors.map((e, i) => (
        <VendorDropDown key={i} vendorName={e}></VendorDropDown>
      ))}
    </>
  );
}

export default VendorDropDownsList;
