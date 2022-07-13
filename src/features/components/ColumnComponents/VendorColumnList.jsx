import VendorColumn from "./VendorColumn";

function VendorColumnList(props) {
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
        <VendorColumn
          key={i}
          vendorName={e}
          itemsAdded={props.itemsAdded.filter(f => f[e])}
        />
      ))}
    </>
  );
}

export default VendorColumnList;
