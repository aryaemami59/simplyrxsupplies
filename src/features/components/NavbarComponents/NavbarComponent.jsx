import Navbar from "react-bootstrap/Navbar";
import { memo } from "react";
import PropTypes from "prop-types";
import OffcanvasComponent from "./OffcanvasComponent";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import { Nav } from "react-bootstrap";

function NavbarComponent({ items }) {
  return (
    <Navbar
      bg="dark"
      expand="lg"
      sticky="top"
      variant="dark"
      className="d-flex justify-content-start">
      <OffcanvasComponent items={items} />
      <Nav fill navbar className="d-none d-lg-flex">
        <VendorDropDownsList items={items} />
      </Nav>
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
