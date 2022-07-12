import VendorAccordion from "./VendorAccordion";
import { Accordion } from "reactstrap";
import { useState } from "react";
function VendorAccordionList() {
  const vendors = [
    "McKesson",
    "OrderInsite",
    "GNFR",
    "signOrderCatalog",
    "vaxServe",
    "medSurge",
    "covap",
    "FORS",
  ];
  const [openItems, setOpenItems] = useState([]);
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
            key={i}
            targetId={i.toString()}
            vendorName={e}
            onToggle={clickHandler}></VendorAccordion>
        ))}
      </Accordion>
    </>
  );
}

export default VendorAccordionList;
