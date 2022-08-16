import { memo } from "react";
import VendorDropDown from "./VendorDropDown";
import vendors from "../../../data/vendors.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import PropTypes from "prop-types";

function VendorDropDownsList() {
  return (
    <>
      {vendors.map((e, i) => (
        <VendorDropDown
          officialVendorName={officialVendorNames[e]}
          key={e}
          vendorName={e}
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
      keywords: PropTypes.arrayOf(PropTypes.string),
      nav: PropTypes.arrayOf(PropTypes.string),
      vendors: PropTypes.arrayOf(PropTypes.string),
      src: PropTypes.string,
    })
  ),
};

export default memo(VendorDropDownsList);
