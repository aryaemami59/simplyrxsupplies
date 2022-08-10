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
  const nodeRef = useRef(null);
  // const renders = useRef(0);
  // console.log("renders:", renders.current++);

  const toggle = useCallback(() => {
    setShow(prev => !prev);
  }, []);

  return (
    <>
      <NavbarTogglerComponent items={items} toggle={toggle} />
      {/* <NavbarToggler onClick={toggle} className="me-2" /> */}
      <Collapse navbar nodeRef={nodeRef}>
        <Nav className="me-auto" navbar nodeRef={nodeRef}>
          <VendorDropDownsList
            nodeRef={nodeRef}
            items={items}
            className="d-none d-lg-inline-block"
          />
        </Nav>
      </Collapse>
      <Offcanvas
        nodeRef={nodeRef}
        isOpen={show}
        toggle={toggle}
        unmountOnClose={false}
        scrollable={true}>
        <OffcanvasHeader nodeRef={nodeRef} toggle={toggle}>
          Offcanvas
        </OffcanvasHeader>
        <OffcanvasBody nodeRef={nodeRef}>
          <strong>This is the Offcanvas body.</strong>
          <VendorAccordionList items={items} nodeRef={nodeRef} />
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}

export default memo(OffcanvasComponent);
