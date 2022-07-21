import VendorAccordion from "./VendorAccordion";
import { Accordion } from "reactstrap";
import { useState } from "react";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import PropTypes from "prop-types";

function VendorAccordionList({ items, itemsAdded, onAdd }) {
  const [openItems, setOpenItems] = useState(() => []);

  const clickHandler = targetId => {
    if (openItems.includes(targetId)) {
      setOpenItems(openItems.filter(e => e !== targetId));
    } else if (!openItems.includes(targetId)) {
      setOpenItems([...openItems, targetId]);
    }
  };

  return (
    <>
      <Accordion open={openItems} toggle={clickHandler}>
        {vendors.map((e, i) => (
          <VendorAccordion
            officialVendorName={officialVendorNames[0][e]}
            key={i}
            targetId={i.toString()}
            vendorName={e}
            onToggle={clickHandler}
            items={items}
            itemsAdded={itemsAdded.filter(f => f[e])}
            onAdd={onAdd}
          />
        ))}
      </Accordion>
    </>
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

export default VendorAccordionList;
