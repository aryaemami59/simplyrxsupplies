import { memo, useCallback, useRef, useState } from "react";
import { ListGroup, Collapse, Button, Card, CardBody } from "reactstrap";
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
  );
}

export default memo(SideBarAccordion);
