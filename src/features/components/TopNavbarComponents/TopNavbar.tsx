import { Nav, Navbar } from "react-bootstrap";
import { memo, useContext, FC } from "react";
import OffcanvasComponent from "./OffcanvasComponent";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import { DarkMode, myContextInterface } from "../../../App";
import DarkModeTogglerButton from "./DarkModeTogglerButton";

const TopNavbar: FC = (): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);

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
      <DarkModeTogglerButton key={`FontAwesomeIcon-NavbarComponent`} />
    </Navbar>
  );
};

export default memo(TopNavbar);
