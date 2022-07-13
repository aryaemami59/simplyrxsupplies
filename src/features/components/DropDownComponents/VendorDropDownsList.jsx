import VendorDropDown from "./VendorDropDown";

function VendorDropDownsList(props) {
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
        <VendorDropDown
          key={i}
          vendorName={e}
          items={props.items}
          onAdd={props.onAdd}
        />
      ))}
    </>
  );
}

export default VendorDropDownsList;
