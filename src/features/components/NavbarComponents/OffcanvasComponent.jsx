import { Nav, Offcanvas, Navbar } from "react-bootstrap";
import { useState, useCallback, memo } from "react";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import SideBarAccordionList from "../SideBarNavComponents/SideBarAccordionList";
import PropTypes from "prop-types";

function OffcanvasComponent() {
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
            <VendorDropDownsList />
          </Nav>
          <Offcanvas.Title className="mb-4">By Category</Offcanvas.Title>
          <div className="accordion rounded border border-info">
            <SideBarAccordionList />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

OffcanvasComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
      keywords: PropTypes.arrayOf(PropTypes.string),
      nav: PropTypes.arrayOf(PropTypes.string),
      vendors: PropTypes.arrayOf(PropTypes.string),
      src: PropTypes.string,
    })
  ),
};

export default memo(OffcanvasComponent);
