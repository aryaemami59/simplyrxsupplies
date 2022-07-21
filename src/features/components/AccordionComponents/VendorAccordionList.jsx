import VendorAccordion from "./VendorAccordion";
import { Accordion } from "reactstrap";
import { useState } from "react";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";

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

export default VendorAccordionList;
