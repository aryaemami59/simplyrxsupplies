import { Nav, Navbar } from "react-bootstrap";
import { memo } from "react";
import OffcanvasComponent from "./OffcanvasComponent";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";

function NavbarComponent() {
  return (
    <Navbar
      bg="dark"
      expand="lg"
      sticky="top"
      variant="dark"
      className="d-flex justify-content-start shadow"
      key={`Navbar-NavbarComponent`}>
      <OffcanvasComponent key={`OffcanvasComponent-NavbarComponent`} />
      <Nav fill navbar className="d-none d-lg-flex" key={`Nav-NavbarComponent`}>
        <VendorDropDownsList key={`VendorDropDownsList-NavbarComponent`} />
      </Nav>
    </Navbar>
  );
}

export default memo(NavbarComponent);
