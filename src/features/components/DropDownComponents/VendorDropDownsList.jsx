import VendorDropDown from "./VendorDropDown";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import { useEffect } from "react";

function VendorDropDownsList({ items, onAdd, added, itemsAdded }) {
  console.log("VendorDropDownsList");
  useEffect(() => {
    console.log(itemsAdded);
  }, [itemsAdded]);

  return (
    <>
      {vendors.map((e, i) => (
        <VendorDropDown
          officialVendorName={officialVendorNames[0][e]}
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
