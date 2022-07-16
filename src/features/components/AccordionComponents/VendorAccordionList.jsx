import VendorAccordion from "./VendorAccordion";
import { Accordion } from "reactstrap";
import { useState } from "react";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";

function VendorAccordionList(props) {
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
            classes={props.classes}
            key={i}
            targetId={i.toString()}
            vendorName={e}
            onToggle={clickHandler}
            items={props.items}
            itemsAdded={props.itemsAdded}
            onAdd={props.onAdd}
          />
        ))}
      </Accordion>
    </>
  );
}

export default VendorAccordionList;
