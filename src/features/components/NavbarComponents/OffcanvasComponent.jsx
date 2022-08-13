import { useState, useCallback, memo } from "react";
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

  return (
    <>
      <Navbar.Toggle
        className="d-lg-none mx-4 navbar-toggler"
        onClick={handleOpen}
      />
      <Offcanvas
        className="text-bg-dark"
        show={show}
        scroll
        onHide={handleClose}>
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Add Items</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Offcanvas.Title className="mb-4">By Vendor</Offcanvas.Title>
          <Nav className="mb-5 rounded border border-info p-4">
            <VendorDropDownsList items={items} />
          </Nav>
          <Offcanvas.Title className="mb-4">By Category</Offcanvas.Title>
          <div className="accordion rounded border border-info">
            <SideBarAccordionList items={items} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default memo(OffcanvasComponent);
