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
import { memo, useState, useRef, useCallback } from "react";
// import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
// import VendorAccordionList from "../AccordionComponents/VendorAccordionList";
import PropTypes from "prop-types";
import OffcanvasComponent from "./OffcanvasComponent";

function NavbarComponent({ items }) {
  // const [show, setShow] = useState(false);

  // const toggle = useCallback(() => {
  //   setShow(prev => !prev);
  // }, []);

  const renders = useRef(0);
  // console.log("renders:", renders.current++);
  return (
    <Navbar color="dark" dark expand="lg" sticky="top">
      <NavbarBrand href="/" className="me-3">
        Simply Supplies
      </NavbarBrand>
      <OffcanvasComponent items={items} />
      {/* <NavbarToggler onClick={toggle} className="me-2"></NavbarToggler>
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
      </Offcanvas> */}
    </Navbar>
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

export default memo(NavbarComponent);
