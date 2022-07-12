import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import items from "../../app/items.json";

function VendorAccordion(props) {
  return (
    <>
      <AccordionItem>
        <AccordionHeader
          targetId={props.targetId}
          onClick={() => props.onToggle(props.targetId)}>
          {props.vendorName}
        </AccordionHeader>
        <AccordionBody accordionId={props.targetId}>
          <ListGroup>
            {items
              .filter(e => e[props.vendorName])
              .map(e => (
                <ListGroupItem key={`${e.name}-${props.vendorName}`}>
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
