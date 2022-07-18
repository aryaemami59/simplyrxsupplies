import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

function VendorAccordion({
  targetId,
  onToggle,
  officialVendorName,
  items,
  vendorName,
  classes,
  itemsAdded,
  onAdd,
}) {
  return (
    <>
      <AccordionItem>
        <AccordionHeader targetId={targetId} onClick={() => onToggle(targetId)}>
          {officialVendorName}
        </AccordionHeader>
        <AccordionBody accordionId={targetId}>
          <ListGroup>
            {items
              .filter(e => e[vendorName])
              .map(e => (
                <ListGroupItem
                  className={itemsAdded.includes(e) ? classes : ""}
                  onClick={() => onAdd(e)}
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
