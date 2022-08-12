import Navbar from "react-bootstrap/Navbar";
import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import OffcanvasComponent from "./OffcanvasComponent";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import NavbarTogglerComponent from "./NavbarTogglerComponent";
import { Button } from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import VendorAccordionList from "../AccordionComponents/VendorAccordionList";
import { NavDropdown } from "react-bootstrap";
import SideBarAccordionList from "../SideBarNavComponents/SideBarAccordionList";

function NavbarComponent({ items }) {
  // const [show, setShow] = useState(false);

  // const handleOpen = useCallback(() => {
  //   setShow(true);
  // }, []);

  // const handleClose = useCallback(() => {
  //   setShow(false);
  // }, []);

  return (
    <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
      <Container fluid className="pe-lg-0 px-xl-3">
        <Navbar.Brand href="/" className="me-0 text-white">
          Simply RX Supplies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-`}
          aria-labelledby={`offcanvasNavbarLabel-expand-`}
          placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-`}>
              Add Items By Vendor
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* <Nav
              className="justify-content-end flex-grow-1 pe-3"
              variant="secondary"> */}
            <VendorDropDownsList items={items} />
            {/* </Nav> */}
            {/* <Nav className="d-lg-none"> */}
            <Nav>
              <SideBarAccordionList
                items={items}
                className="bg-light accordion d-block d-lg-none"
              />
            </Nav>
            {/* </Nav> */}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    // <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
    //   <Navbar.Brand href="/" className="mx-lg-0 mx-xl-3  text-white">
    //     Simply RX Supplies
    //   </Navbar.Brand>
    //   <VendorDropDownsList items={items} />
    //   <OffcanvasComponent items={items} />
    // </Navbar>
  );
}

NavbarComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
};

export default memo(NavbarComponent);
