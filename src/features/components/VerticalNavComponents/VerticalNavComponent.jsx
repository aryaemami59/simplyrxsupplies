import {
  Nav,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import { useState } from "react";
import navList from "../../../data/navList";

function VerticalNavComponent() {
  const [open, setOpen] = useState("");
  const toggle = id => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <Nav
      vertical
      className="overflow-auto w-100 h-100"
      style={{}}>
      <Accordion open={open} toggle={toggle}>
        {navList.map(e => (
          <AccordionItem>
            <AccordionHeader targetId="1">{e}</AccordionHeader>
            <AccordionBody accordionId="1"></AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
    </Nav>
  );
}

export default VerticalNavComponent;
