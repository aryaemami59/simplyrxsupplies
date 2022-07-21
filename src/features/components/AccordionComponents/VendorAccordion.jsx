import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import BadgeComponent from "../ColumnComponents/BadgeComponent";

function VendorAccordion({
  targetId,
  onToggle,
  officialVendorName,
  items,
  vendorName,
  itemsAdded,
  onAdd,
}) {
  return (
    <>
      <AccordionItem>
        <AccordionHeader targetId={targetId} onClick={() => onToggle(targetId)}>
          <BadgeComponent
            itemsAdded={itemsAdded}
            key={`${officialVendorName}-VendorColumn-Badge`}
          />
          {officialVendorName}
        </AccordionHeader>
        <AccordionBody accordionId={targetId}>
          <ListGroup>
            {items
              .filter(e => e[vendorName])
              .map(e => (
                <ListGroupItem
                  className={
                    itemsAdded.includes(e) ? "text-decoration-line-through" : ""
                  }
                  onClick={() => !itemsAdded.includes(e) && onAdd(e)}
                  key={`${e.name}-${vendorName}`}>
                  {e.name}
                </ListGroupItem>
              ))}
          </ListGroup>
        </AccordionBody>
      </AccordionItem>
    </>
  );
}

export default VendorAccordion;
