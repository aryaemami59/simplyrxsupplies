import { Navbar, NavbarBrand } from "reactstrap";
import { memo, useRef } from "react";
import PropTypes from "prop-types";
import OffcanvasComponent from "./OffcanvasComponent";

function NavbarComponent({ items }) {
  return (
    <Navbar color="dark" dark expand="lg" sticky="top">
      <NavbarBrand href="/" className="me-3">
        Simply Supplies
      </NavbarBrand>
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
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  onAdd: PropTypes.func,
};

export default memo(NavbarComponent);
