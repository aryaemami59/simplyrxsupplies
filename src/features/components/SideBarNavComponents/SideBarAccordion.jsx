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
    //       <Card className="bg-gradient">
    //         <Card.Body className="bg-gradient">
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
    <div className="">
      <h2 className="accordion-header">
        <button
          onClick={toggle}
          variant="light"
          className={`accordion-button ${
            open ? "" : collapsed
          }`}>
          {targetId}
        </button>
      </h2>
      <Collapse id={targetId} in={open} ref={nodeRef} className="bg-gradient">
        <div>
          <Card className="bg-dark bg-gradient">
            <Card.Body className="bg-dark bg-gradient">
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
