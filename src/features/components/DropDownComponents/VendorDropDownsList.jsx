import VendorDropDown from "./VendorDropDown";
import { useState } from "react";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";

function VendorDropDownsList(props) {
  const [added, setAdded] = useState(false);
  // console.log("rendering VendorDropDownsList");

  return (
    <>
      {vendors.map((e, i) => (
        <VendorDropDown
          officialVendorName={officialVendorNames[0][e]}
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
