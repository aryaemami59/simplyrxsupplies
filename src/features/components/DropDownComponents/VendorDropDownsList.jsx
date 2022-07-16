import VendorDropDown from "./VendorDropDown";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";

function VendorDropDownsList(props) {
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
          added={props.added}
          itemsAdded={props.itemsAdded}
        />
      ))}
    </>
  );
}

export default VendorDropDownsList;
