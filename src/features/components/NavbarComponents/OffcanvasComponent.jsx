import { useState, useCallback, memo, useRef, useEffect } from "react";
// import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import VendorAccordionList from "../AccordionComponents/VendorAccordionList";
import NavbarTogglerComponent from "./NavbarTogglerComponent";
import { Collapse } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";

function OffcanvasComponent({ items }) {
  const nodeRef = useRef(null);
  const [show, setShow] = useState(false);

  const handleOpen = useCallback(() => {
    setShow(true);
  }, []);

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    console.log("OffcanvasComponent mounts");
    return () => console.log("OffcanvasComponent unmounts");
  }, []);

  return (
    <>
      {/* <Button className="d-lg-none" onClick={handleOpen}>
        Toggle
      </Button> */}
      <Navbar.Toggle
        className="d-lg-none navbar-toggler"
        onClick={handleOpen}
      />
      <Offcanvas show={show} scroll={true} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <VendorDropDownsList items={items} /> */}
          <VendorAccordionList items={items} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default memo(OffcanvasComponent);
