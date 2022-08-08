import { memo, useCallback, useRef, useState } from "react";
import { Nav } from "reactstrap";
import { Collapse } from "reactstrap";
import { NavbarToggler } from "reactstrap";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";

function NavbarTogglerComponent({ items, toggle }) {
  // const [show, setShow] = useState(false);
  // const renders = useRef(0);
  // console.log("renders:", renders.current++);

  // const toggle = useCallback(() => {
  //   setShow(prev => !prev);
  // }, []);
  return (
    <NavbarToggler onClick={toggle} className="me-2" />
    /* <Collapse navbar>
        <Nav className="me-auto" navbar>
          <VendorDropDownsList items={items} />
        </Nav>
      </Collapse> */
  );
}

export default memo(NavbarTogglerComponent);
