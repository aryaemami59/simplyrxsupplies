import { useState, useCallback, memo, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import SideBarAccordionList from "../SideBarNavComponents/SideBarAccordionList";

function OffcanvasComponent({ items }) {
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
        className="d-lg-none mx-4 navbar-toggler"
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
          <Nav className="mb-5 border-bottom border-5 border-info">
            <VendorDropDownsList items={items} />
          </Nav>
          <div className="accordion rounded border border-info">
            <SideBarAccordionList items={items} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default memo(OffcanvasComponent);
