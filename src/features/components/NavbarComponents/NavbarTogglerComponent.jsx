import { Navbar } from "react-bootstrap";
import { memo } from "react";
import PropTypes from "prop-types";

function NavbarTogglerComponent({ toggle }) {
  return <Navbar.Toggle onClick={toggle} className="me-2 d-lg-none" />;
}

NavbarTogglerComponent.propTypes = {
  toggle: PropTypes.func,
};

export default memo(NavbarTogglerComponent);
