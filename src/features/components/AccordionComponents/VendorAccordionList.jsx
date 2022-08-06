import VendorAccordion from "./VendorAccordion";
import { Accordion, UncontrolledAccordion } from "reactstrap";
import { memo } from "react";
import vendors from "../../../data/vendors.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import PropTypes from "prop-types";

function VendorAccordionList({ items }) {
  return (
    <UncontrolledAccordion stayOpen>
      {vendors.map((e, i) => (
        <VendorAccordion
          officialVendorName={officialVendorNames[e]}
          key={officialVendorNames[e]}
          vendorName={e}
          items={items}
        />
      ))}
    </UncontrolledAccordion>
  );
}

VendorAccordionList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  onAdd: PropTypes.func,
};

export default memo(VendorAccordionList);
