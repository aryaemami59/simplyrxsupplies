import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  ListGroup,
} from "reactstrap";
import BadgeComponent from "../ColumnComponents/BadgeComponent";
import PropTypes from "prop-types";
import { memo, useRef } from "react";
import SingleAccordionListItem from "./SingleAccordionListItem";
import JsBarcode from "jsbarcode";

function VendorAccordion({ officialVendorName, items, vendorName, targetId }) {
  const renders = useRef(0);
  // const ref = useRef();
  // console.log("renders:", renders.current++);
  return (
    <AccordionItem>
      <AccordionHeader targetId={targetId}>
        <BadgeComponent
          vendorName={vendorName}
          key={`${officialVendorName}-VendorColumn-Badge`}
        />
        {officialVendorName}
      </AccordionHeader>
      <AccordionBody accordionId={targetId}>
        <ListGroup>
          {items
            .filter(e => e[vendorName])
            .map(e => (
              <SingleAccordionListItem
                vendorName={vendorName}
                vendors={e.vendors}
                key={`${e.name}-${vendorName}`}
                itemObj={e}
                role="button"
              />
            ))}
        </ListGroup>
      </AccordionBody>
    </AccordionItem>
  );
}

VendorAccordion.propTypes = {
  targetId: PropTypes.string,
  onToggle: PropTypes.func,
  officialVendorName: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  vendorName: PropTypes.string,
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  onAdd: PropTypes.func,
};

export default memo(VendorAccordion);
