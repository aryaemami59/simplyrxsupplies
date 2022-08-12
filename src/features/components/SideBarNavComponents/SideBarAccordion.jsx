import { memo, useCallback, useRef, useState } from "react";
import { Collapse } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import { Card } from "react-bootstrap";
// import { Button } from "react-bootstrap/Button";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";

const collapsed = "collapsed";

function SideBarAccordion({ items, targetId }) {
  // const [open, setOpen] = useState("");

  // const toggle = useCallback(() => {
  //   setOpen(prev => (prev === "" ? "1" : ""));
  // }, []);
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const nodeRef = useRef(null);

  return (
    // <div>
    //   <Accordion.Item eventKey="1">
    //     <Accordion.Header>{targetId}</Accordion.Header>
    //     <Accordion.Body>
    //       <Card className="bg-light bg-gradient">
    //         <Card.Body className="bg-light bg-gradient">
    //           <ListGroup>
    //             {items
    //               .filter(({ nav }) => nav.includes(targetId))
    //               .map(f => (
    //                 <SingleSideBarAccordionListItem
    //                   items={items}
    //                   targetId={targetId}
    //                   itemObj={f}
    //                   key={`${f.name}-SingleSideBarAccordionListItem`}
    //                 />
    //               ))}
    //           </ListGroup>
    //         </Card.Body>
    //       </Card>
    //     </Accordion.Body>
    //   </Accordion.Item>
    // </div>
    <div>
      <h2 className="accordion-header bg-light bg-gradient">
        <button
          onClick={toggle}
          variant="light"
          className={`accordion-button bg-light bg-gradient ${
            open ? "" : collapsed
          }`}>
          {targetId}
        </button>
      </h2>
      <Collapse
        id={targetId}
        in={open}
        ref={nodeRef}
        className="bg-light bg-gradient">
        <div>
          <Card className="bg-light bg-gradient">
            <Card.Body className="bg-light bg-gradient">
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
            </Card.Body>
          </Card>
        </div>
      </Collapse>
    </div>
  );
}

export default memo(SideBarAccordion);
