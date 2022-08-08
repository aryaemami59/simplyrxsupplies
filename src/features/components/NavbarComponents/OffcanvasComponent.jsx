import { useState, useCallback, memo, useRef } from "react";
import {
  NavbarToggler,
  Collapse,
  Nav,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import VendorAccordionList from "../AccordionComponents/VendorAccordionList";
import NavbarTogglerComponent from "./NavbarTogglerComponent";

function OffcanvasComponent({ items }) {
  const [show, setShow] = useState(false);
  const renders = useRef(0);
  // console.log("renders:", renders.current++);

  const toggle = useCallback(() => {
    setShow(prev => !prev);
  }, []);

  return (
    <>
      {/* <NavbarTogglerComponent items={items} /> */}
      <NavbarToggler onClick={toggle} className="me-2"></NavbarToggler>
      <Collapse navbar>
        <Nav className="me-auto" navbar>
          <VendorDropDownsList items={items} />
        </Nav>
      </Collapse>
      <Offcanvas direction="start" isOpen={show} toggle={toggle}>
        <OffcanvasHeader toggle={toggle}>Offcanvas</OffcanvasHeader>
        <OffcanvasBody>
          <strong>This is the Offcanvas body.</strong>
          <VendorAccordionList items={items} />
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}

export default memo(OffcanvasComponent);
