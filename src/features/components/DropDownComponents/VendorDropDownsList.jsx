import VendorDropDown from "./VendorDropDown";
import vendors from "../../../data/vendors.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import { memo } from "react";
import PropTypes from "prop-types";

function VendorDropDownsList({ items }) {
  return (
    <>
      {vendors.map((e, i) => (
        <VendorDropDown
          officialVendorName={officialVendorNames[e]}
          key={e}
          vendorName={e}
          items={items}
          index={i}
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
