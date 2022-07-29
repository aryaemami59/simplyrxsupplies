import VendorAccordion from "./VendorAccordion";
import { Accordion, UncontrolledAccordion } from "reactstrap";
import { useState, useContext, useCallback, memo } from "react";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import PropTypes from "prop-types";
import { myContext } from "../ContextComponents/AddedContext";

function VendorAccordionList({ items }) {
  // const [openItems, setOpenItems] = useState([]);
  const { itemsAdded, onAdd } = useContext(myContext);

  // const clickHandler = useCallback(
  //   targetId => {
  //     if (openItems.includes(targetId)) {
  //       return setOpenItems(openItems.filter(e => e !== targetId));
  //     } else if (!openItems.includes(targetId)) {
  //       return setOpenItems([...openItems, targetId]);
  //     }
  //   },
  //   [openItems.length]
  // );

  // const clickHandler = targetId => {
  //   if (openItems.includes(targetId)) {
  //     setOpenItems(openItems.filter(e => e !== targetId));
  //   } else if (!openItems.includes(targetId)) {
  //     setOpenItems([...openItems, targetId]);
  //   }
  // };

  return (
    <UncontrolledAccordion
      stayOpen
      // open={openItems}
      //  toggle={clickHandler}
    >
      {vendors.map((e, i) => (
        <VendorAccordion
          officialVendorName={officialVendorNames[0][e]}
          key={officialVendorNames[0][e]}
          // targetId={i.toString()}
          vendorName={e}
          // onToggle={clickHandler}
          items={items}
          onAdd={onAdd}
          itemsAdded={itemsAdded.filter(f => f[e])}
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
