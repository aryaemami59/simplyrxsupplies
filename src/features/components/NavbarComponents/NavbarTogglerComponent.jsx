import { memo } from "react";
import { Navbar } from "react-bootstrap";

function NavbarTogglerComponent({ toggle }) {
  return <Navbar.Toggle onClick={toggle} className="me-2 d-lg-none" />;
}

export default memo(NavbarTogglerComponent);
