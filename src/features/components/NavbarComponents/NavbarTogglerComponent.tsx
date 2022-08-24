import { Navbar } from "react-bootstrap";
import { memo, FC, MouseEventHandler } from "react";
// import PropTypes from "prop-types";

interface Props {
  toggle: MouseEventHandler<HTMLElement>;
}

const NavbarTogglerComponent: FC<Props> = ({ toggle }): JSX.Element => {
  return <Navbar.Toggle onClick={toggle} className={`me-2 d-lg-none`} />;
};

// NavbarTogglerComponent.propTypes = {
//   toggle: PropTypes.func,
// };ss

export default memo(NavbarTogglerComponent);
