import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import { useState } from "react";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import VendorAccordionList from "../AccordionComponents/VendorAccordionList";

function NavbarComponent(props) {
  const [show, setShow] = useState(() => false);

  return (
    <>
      <Navbar color="dark" dark expand="lg" sticky="top">
        <NavbarBrand href="/" className="me-3">
          Simply Supplies
        </NavbarBrand>
        <NavbarToggler
          onClick={() => setShow(!show)}
          className="me-2"></NavbarToggler>
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <VendorDropDownsList
              classes={props.classes}
              items={props.items}
              itemsAdded={props.itemsAdded}
              onAdd={props.onAdd}
            />
          </Nav>
        </Collapse>
        <Offcanvas
          direction="start"
          isOpen={show}
          toggle={() => setShow(!show)}>
          <OffcanvasHeader toggle={() => setShow(!show)}>
            Offcanvas
          </OffcanvasHeader>
          <OffcanvasBody>
            <strong>This is the Offcanvas body.</strong>
            <VendorAccordionList
              classes={props.classes}
              itemsAdded={props.itemsAdded}
              items={props.items}
              onAdd={props.onAdd}
            />
          </OffcanvasBody>
        </Offcanvas>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
