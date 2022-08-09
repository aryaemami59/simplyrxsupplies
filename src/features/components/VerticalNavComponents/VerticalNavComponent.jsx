import {
  Nav,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useState } from "react";
import navList from "../../../data/navList";

const empty = [];

function VerticalNavComponent({ items }) {
  const [open, setOpen] = useState(empty);
  // const renders = useRef(0);
  // console.log("renders:", renders.current++);

  const toggle = id => {
    if (open.includes(id)) {
      setOpen(prev => {
        const newOpen = prev.filter(e => e !== id);
        return newOpen.length ? newOpen : empty;
      });
    } else {
      setOpen(prev => prev.concat(id));
    }
  };

  return (
    <Nav vertical className="overflow-auto w-100 h-100" style={{}}>
      <Accordion open={open} toggle={toggle}>
        {navList.map(e => (
          <AccordionItem key={`${e}-accordion-item`}>
            <AccordionHeader key={`${e}-accordion-header`} targetId={e}>
              {e}
            </AccordionHeader>
            <AccordionBody key={`${e}-accordion-body`} accordionId={e}>
              <ListGroup>
                {items
                  .filter(({ nav }) => nav.includes(e))
                  .map(f => (
                    <ListGroupItem>{f.name}</ListGroupItem>
                  ))}
              </ListGroup>
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
    </Nav>
  );
}

export default VerticalNavComponent;
