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
  const [show, setShow] = useState(false);

  const handleOpen = useCallback(() => {
    setShow(true);
  }, []);

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  return (
    // <Navbar
    //   bg="dark"
    //   expand="lg"
    //   sticky="top"
    //   variant="dark"
    //   className="bg-gradient">
    //   <Container fluid className="pe-lg-0 px-xl-3">
    //     <Navbar.Brand href="/" className="me-0 text-white d-lg-none d-xl-block">
    //       Simply RX Supplies
    //     </Navbar.Brand>
    //     <Navbar.Toggle
    //       aria-controls={`offcanvasNavbar-expand-`}
    //       onClick={handleOpen}
    //     />
    //     <Navbar.Offcanvas
    //       show={show}
    //       scroll
    //       className="bg-dark"
    //       onHide={handleClose}
    //       id={`offcanvasNavbar-expand-`}
    //       aria-labelledby={`offcanvasNavbarLabel-expand-`}
    //       placement="start">
    //       <Offcanvas.Header closeButton>
    //         <Offcanvas.Title
    //           id={`offcanvasNavbarLabel-expand-`}
    //           className="text-white">
    //           Add Items By Vendor
    //         </Offcanvas.Title>
    //       </Offcanvas.Header>
    //       <Offcanvas.Body>
    //         <Nav>
    //           <VendorDropDownsList items={items} />
    //         </Nav>
    //         <Nav>
    //           <div className="accordion d-block d-lg-non">
    //             <SideBarAccordionList items={items} />
    //           </div>
    //         </Nav>
    //       </Offcanvas.Body>
    //     </Navbar.Offcanvas>
    //   </Container>
    // </Navbar>
    <Navbar
      bg="dark"
      expand="lg"
      sticky="top"
      variant="dark"
      className="d-flex shadow justify-content-start">
      <OffcanvasComponent items={items} />
      <div className="d-none d-lg-block">
        <VendorDropDownsList items={items} />
      </div>
      {/* <Navbar.Collapse></Navbar.Collapse> */}
      {/* <Navbar.Brand href="/" className="mx-lg-0 mx-xl-3 text-white fs-6">
        Simply RX Supplies
      </Navbar.Brand> */}
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
};

export default memo(NavbarComponent);
