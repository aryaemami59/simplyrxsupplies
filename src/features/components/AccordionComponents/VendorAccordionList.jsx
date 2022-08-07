import VendorAccordion from "./VendorAccordion";
import { Accordion } from "reactstrap";
import { memo, useState } from "react";
import vendors from "../../../data/vendors.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import PropTypes from "prop-types";

const empty = [];

function VendorAccordionList({ items }) {
  const [open, setOpen] = useState(empty);

  const toggle = id => {
    console.log(id);
    if (open.includes(id)) {
      setOpen(prev => {
        const newOpen = prev.filter(e => e !== id);
        return newOpen.length ? newOpen : empty;
      });
    } else {
      setOpen(prev => prev.concat(id));
    }
  };

  return (
    <Accordion open={open} toggle={toggle}>
      {vendors.map((e, i) => (
        <VendorAccordion
          officialVendorName={officialVendorNames[e]}
          key={officialVendorNames[e]}
          targetId={i.toString()}
          vendorName={e}
          items={items}
        />
      ))}
    </Accordion>
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
