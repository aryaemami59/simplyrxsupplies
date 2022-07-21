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
import PropTypes from "prop-types";

function NavbarComponent({ items, itemsAdded, onAdd }) {
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
              items={items}
              itemsAdded={itemsAdded}
              onAdd={onAdd}
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
              itemsAdded={itemsAdded}
              items={items}
              onAdd={onAdd}
            />
          </OffcanvasBody>
        </Offcanvas>
      </Navbar>
    </>
  );
}

NavbarComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  onAdd: PropTypes.func,
};

export default NavbarComponent;
