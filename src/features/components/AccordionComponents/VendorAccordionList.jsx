import VendorAccordion from "./VendorAccordion";
import { Accordion, UncontrolledAccordion } from "reactstrap";
import { useState, useContext, useCallback, memo } from "react";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import PropTypes from "prop-types";
import { myContext } from "../ContextComponents/AddedContext";
import vendorAbbr from "../../../data/vendorAbbr.json";

function VendorAccordionList({ items }) {
  return (
    <UncontrolledAccordion stayOpen>
      {vendors.map((e, i) => (
        <VendorAccordion
          officialVendorName={officialVendorNames[0][e]}
          key={officialVendorNames[0][e]}
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
