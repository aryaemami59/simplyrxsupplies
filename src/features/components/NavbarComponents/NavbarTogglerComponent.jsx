import { Navbar } from "react-bootstrap";
import { memo } from "react";
const NavbarTogglerComponent = ({ toggle }) => {
    return <Navbar.Toggle onClick={toggle} className={`me-2 d-lg-none`}/>;
};
export default memo(NavbarTogglerComponent);
