import { Nav, Navbar } from "react-bootstrap";
import { memo, useContext } from "react";
import OffcanvasComponent from "./OffcanvasComponent";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import { DarkMode } from "../../../App";
import DarkModeTogglerButtonComponent from "./DarkModeTogglerButtonComponent";

function NavbarComponent() {
  const { darkTheme } = useContext(DarkMode);

  return (
    <Navbar
      bg={darkTheme ? "dark" : "light"}
      expand="lg"
      sticky="top"
      variant={darkTheme ? "dark" : "light"}
      className="d-flex justify-content-start shadow"
      key={`Navbar-NavbarComponent`}>
      <OffcanvasComponent key={`OffcanvasComponent-NavbarComponent`} />
      <Nav fill navbar className="d-none d-lg-flex" key={`Nav-NavbarComponent`}>
        <VendorDropDownsList key={`VendorDropDownsList-NavbarComponent`} />
      </Nav>
      <DarkModeTogglerButtonComponent key={`FontAwesomeIcon-NavbarComponent`} />
    </Navbar>
  );
}

export default memo(NavbarComponent);
