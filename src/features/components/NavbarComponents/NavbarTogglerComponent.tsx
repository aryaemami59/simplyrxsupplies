import { Navbar } from "react-bootstrap";
import { memo, FC, MouseEventHandler } from "react";

type Props = {
  toggle: MouseEventHandler<HTMLElement>;
};

const NavbarTogglerComponent: FC<Props> = ({ toggle }): JSX.Element => {
  return <Navbar.Toggle onClick={toggle} className={`me-2 d-lg-none`} />;
};

export default memo<Props>(NavbarTogglerComponent);
