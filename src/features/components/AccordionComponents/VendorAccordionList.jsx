import { memo } from "react";
import VendorAccordion from "./VendorAccordion";
import vendors from "../../../data/vendors.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import PropTypes from "prop-types";

function VendorAccordionList() {
  return (
    <div className="bg-dark accordion">
      {vendors.map(e => (
        <VendorAccordion
          officialVendorName={officialVendorNames[e]}
          key={officialVendorNames[e]}
          vendorName={e}
        />
      ))}
    </div>
  );
}

VendorAccordionList.propTypes = {
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

export default memo(VendorAccordionList);
