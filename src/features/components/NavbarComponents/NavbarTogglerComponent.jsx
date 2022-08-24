import { Navbar } from "react-bootstrap";
import { memo } from "react";
const NavbarTogglerComponent = ({ toggle }) => {
    return <Navbar.Toggle onClick={toggle} className={`me-2 d-lg-none`}/>;
};
// NavbarTogglerComponent.propTypes = {
//   toggle: PropTypes.func,
// };ss
export default memo(NavbarTogglerComponent);
