import VendorDropDown from "./VendorDropDown";
import { useState, useEffect } from "react";

function VendorDropDownsList(props) {
  const [added, setAdded] = useState(false);
  const [classes, setClasses] = useState("");

  useEffect(() => {
    // console.log(added);
    setClasses("text-decoration-line-through");
    console.log(props.itemsAdded);
  }, [props.itemsAdded]);
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
          classes={classes}
          // classes={props.classes}
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
