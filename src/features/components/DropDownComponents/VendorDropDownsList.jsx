import VendorDropDown from "./VendorDropDown";
import { useState } from "react";

function VendorDropDownsList(props) {
  const [added, setAdded] = useState(false);
  console.log("rendering VendorDropDownsList");
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
          classes={props.classes}
          key={i}
          vendorName={e}
          items={props.items}
          onAdd={props.onAdd}
          added={added}
          itemsAdded={props.itemsAdded}
          onEvent={() => setAdded(!added)}
        />
      ))}
    </>
  );
}

export default VendorDropDownsList;
