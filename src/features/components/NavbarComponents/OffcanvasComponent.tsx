import { Nav, Offcanvas, Navbar } from "react-bootstrap";
import { useState, useCallback, memo, useContext, FC } from "react";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import SideBarAccordionList from "../SideBarNavComponents/SideBarAccordionList";
import { DarkMode } from "../../../App";

const OffcanvasComponent: FC = (): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
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
        key={`Navbar.Toggle-OffcanvasComponent`}
        className="d-lg-none mx-4 navbar-toggler"
        onClick={handleOpen}
      />
      <Offcanvas
        className={`${darkTheme ? "text-bg-dark" : "text-bg-light"}`}
        key={`Offcanvas-OffcanvasComponent`}
        show={show}
        scroll
        onHide={handleClose}>
        <Offcanvas.Header
          closeButton
          closeVariant="white"
          key={`Offcanvas.Header-OffcanvasComponent`}>
          <Offcanvas.Title key={`Offcanvas.Title-OffcanvasComponent-Add Items`}>
            Add Items
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body key={`Offcanvas.Body-OffcanvasComponent`}>
          <Offcanvas.Title
            className="mb-4"
            key={`Offcanvas.Title-OffcanvasComponent-By Vendor`}>
            By Vendor
          </Offcanvas.Title>
          <Nav
            className={`mb-5 rounded border p-4 ${
              darkTheme ? "border-info" : "border-dark"
            }`}
            key={`Nav-OffcanvasComponent`}>
            <VendorDropDownsList
              key={`VendorDropDownsList-OffcanvasComponent`}
            />
          </Nav>
          <Offcanvas.Title
            className="mb-4"
            key={`Offcanvas.Title-OffcanvasComponent-By Category`}>
            By Category
          </Offcanvas.Title>
          <div
            key={`div-OffcanvasComponent`}
            className={`accordion rounded border ${
              darkTheme ? "border-info" : "border-dark"
            }`}>
            <SideBarAccordionList
              key={`SideBarAccordionList-OffcanvasComponent`}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default memo(OffcanvasComponent);
