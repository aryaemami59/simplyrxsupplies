import { memo } from "react";
import VendorAccordion from "./VendorAccordion";
import vendors from "../../../data/vendors.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import PropTypes from "prop-types";

function VendorAccordionList({ items }) {
  return (
    <div className="bg-dark accordion">
      {vendors.map((e, i) => (
        <VendorAccordion
          officialVendorName={officialVendorNames[e]}
          key={officialVendorNames[e]}
          // targetId={i.toString()}
          vendorName={e}
          items={items}
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
    })
  ),
};

export default memo(VendorAccordionList);
