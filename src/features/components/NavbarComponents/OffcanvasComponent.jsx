import { useState, useCallback, memo, useRef } from "react";
// import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import VendorAccordionList from "../AccordionComponents/VendorAccordionList";
import NavbarTogglerComponent from "./NavbarTogglerComponent";
import { Collapse } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import { Navbar } from "react-bootstrap";

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
      {/* <Navbar.Collapse in={!show}>
        <Nav className="me-auto" navbar>
          <VendorDropDownsList
            items={items}
            className="d-none d-lg-inline-block"
          />
        </Nav>
      </Navbar.Collapse> */}
      <Offcanvas
        show={show}
        toggle={toggle}
        unmountOnClose={false}
        scrollable={true}>
        <Offcanvas.Header toggle={toggle}>Offcanvas</Offcanvas.Header>
        <Offcanvas.Body>
          <strong>This is the Offcanvas body.</strong>
          <VendorAccordionList items={items} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default memo(OffcanvasComponent);
