import { memo } from "react";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  ListGroup,
} from "reactstrap";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";

function SideBarAccordion({ items, targetId }) {
  return (
    <AccordionItem
      key={`${targetId}-accordion-item`}
      // className="bg-dark bg-gradient"
    >
      <AccordionHeader
        color="dark"
        // className="bg-dark bg-gradient"
        key={`${targetId}-accordion-header`}
        targetId={targetId}>
        {targetId}
      </AccordionHeader>
      <AccordionBody
        // className="bg-dark bg-gradient"
        key={`${targetId}-accordion-body`}
        accordionId={targetId}>
        <ListGroup>
          {items
            .filter(({ nav }) => nav.includes(targetId))
            .map(f => (
              <SingleSideBarAccordionListItem
                items={items}
                targetId={targetId}
                itemObj={f}
                key={`${f.name}-SingleSideBarAccordionListItem`}
              />
            ))}
        </ListGroup>
      </AccordionBody>
    </AccordionItem>
  );
}

export default memo(SideBarAccordion);
