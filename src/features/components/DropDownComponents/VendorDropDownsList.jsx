import VendorDropDown from "./VendorDropDown";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import { useEffect } from "react";

function VendorDropDownsList({ classes, items, onAdd, added, itemsAdded }) {
  // useEffect(() => {
  //   console.log("a");
  // }, [itemsAdded]);

  return (
    <>
      {vendors.map((e, i) => (
        <VendorDropDown
          officialVendorName={officialVendorNames[0][e]}
          classes={classes}
          key={i}
          vendorName={e}
          items={items}
          onAdd={onAdd}
          added={added}
          itemsAdded={itemsAdded}
        />
      ))}
    </>
  );
}

export default VendorDropDownsList;
