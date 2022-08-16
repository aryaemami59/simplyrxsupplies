import { Nav, Navbar } from "react-bootstrap";
import { memo } from "react";
import OffcanvasComponent from "./OffcanvasComponent";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import PropTypes from "prop-types";

function NavbarComponent() {
  return (
    <Navbar
      bg="dark"
      expand="lg"
      sticky="top"
      variant="dark"
      className="d-flex justify-content-start shadow">
      <OffcanvasComponent />
      <Nav fill navbar className="d-none d-lg-flex">
        <VendorDropDownsList />
      </Nav>
    </Navbar>
  );
}

NavbarComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
      keywords: PropTypes.arrayOf(PropTypes.string),
      nav: PropTypes.arrayOf(PropTypes.string),
      vendors: PropTypes.arrayOf(PropTypes.string),
      src: PropTypes.string,
    })
  ),
};

export default memo(NavbarComponent);
