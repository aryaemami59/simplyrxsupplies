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
import SideBarAccordionList from "../SideBarNavComponents/SideBarAccordionList";

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
      <Navbar.Toggle
        className="d-lg-none navbar-toggler"
        onClick={handleOpen}
      />
      <Offcanvas
        className="text-bg-dark"
        show={show}
        scroll={true}
        onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Items By Vendor or Category</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <VendorAccordionList items={items} /> */}
          <VendorDropDownsList items={items} />
          <div className="accordion ">
            <SideBarAccordionList items={items} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default memo(OffcanvasComponent);
