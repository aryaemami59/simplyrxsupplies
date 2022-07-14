import VendorDropDown from "./VendorDropDown";
import { useState, useEffect, useRef } from "react";

function VendorDropDownsList(props) {
  const [added, setAdded] = useState(false);
  // const [classes, setClasses] = useState("");
  // const isInitialMount = useRef(true);

  console.log("rendering VendorDropDownsList");

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     setClasses("text-decoration-line-through");
  //   }
  // }, [props.itemsAdded]);

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
