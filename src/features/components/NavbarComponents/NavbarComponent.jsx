import Navbar from "react-bootstrap/Navbar";
import { memo, useRef } from "react";
import PropTypes from "prop-types";
import OffcanvasComponent from "./OffcanvasComponent";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";

function NavbarComponent({ items }) {
  return (
    <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
      <Navbar.Brand href="/" className="mx-3 text-white">
        Simply Supplies
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
