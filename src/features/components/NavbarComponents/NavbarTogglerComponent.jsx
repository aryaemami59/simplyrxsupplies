import { memo, useCallback, useRef, useState } from "react";
import { Navbar } from "react-bootstrap";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";

function NavbarTogglerComponent({ items, toggle }) {
  // const [show, setShow] = useState(false);
  // const renders = useRef(0);
  // console.log("renders:", renders.current++);

  // const toggle = useCallback(() => {
  //   setShow(prev => !prev);
  // }, []);
  return (
    <Navbar.Toggle onClick={toggle} className="me-2" />
    /* <Collapse navbar>
        <Nav className="me-auto" navbar>
          <VendorDropDownsList items={items} />
        </Nav>
      </Collapse> */
  );
}

export default memo(NavbarTogglerComponent);
