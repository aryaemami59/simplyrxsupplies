import { memo, useCallback, useRef, useState } from "react";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  ListGroup,
  Collapse,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
const collapsed = "collapsed";
function SideBarAccordion({ items, targetId }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const nodeRef = useRef(null);

  return (
    <div>
      <h2 className="accordion-header">
        {/* <button
          className={`accordion-button ${open ? "" : collapsed}`}
          data-bs-toggle={"collapse"}
          data-bs-target={targetId}
          onClick={toggle}>
          {targetId}
        </button> */}
        <Button
          onClick={toggle}
          color="light"
          className={`accordion-button ${open ? "" : collapsed}`}>
          {targetId}
        </Button>
      </h2>
      <Collapse
        id={targetId}
        isOpen={open}
        ref={nodeRef}
        className="accordion-collapse">
        <Card>
          <CardBody>
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
          </CardBody>
        </Card>
      </Collapse>
    </div>
    // <AccordionItem key={`${targetId}-accordion-item`}>
    //   <AccordionHeader
    //     color="dark"
    //     key={`${targetId}-accordion-header`}
    //     targetId={targetId}>
    //     {targetId}
    //   </AccordionHeader>
    //   <AccordionBody key={`${targetId}-accordion-body`} accordionId={targetId}>
    //     <ListGroup>
    //       {items
    //         .filter(({ nav }) => nav.includes(targetId))
    //         .map(f => (
    //           <SingleSideBarAccordionListItem
    //             items={items}
    //             targetId={targetId}
    //             itemObj={f}
    //             key={`${f.name}-SingleSideBarAccordionListItem`}
    //           />
    //         ))}
    //     </ListGroup>
    //   </AccordionBody>
    // </AccordionItem>
  );
}

export default memo(SideBarAccordion);
