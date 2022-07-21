import VendorDropDown from "./VendorDropDown";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import { memo, useEffect } from "react";
import PropTypes from "prop-types";

function VendorDropDownsList({ items, onAdd, itemsAdded }) {
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
          itemsAdded={itemsAdded}
        />
      ))}
    </>
  );
}

VendorDropDownsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  onAdd: PropTypes.func,
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
};

export default memo(VendorDropDownsList);
