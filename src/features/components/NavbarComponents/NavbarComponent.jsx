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
      <Navbar.Brand href="/" className="mx-lg-0 mx-xl-3  text-white">
        Simply RX Supplies
      </Navbar.Brand>
      <VendorDropDownsList items={items} />
      <OffcanvasComponent items={items} />
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
