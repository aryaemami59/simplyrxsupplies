import { FC, memo, useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { DarkMode } from "../../../App";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import DarkModeTogglerButton from "./DarkModeTogglerButton";
import OffcanvasComponent from "./OffcanvasComponent";

const TopNavbar: FC = (): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const theme = darkTheme ? "dark" : "light";

  return (
    <Navbar
      bg={theme}
      expand="lg"
      sticky="top"
      variant={theme}
      className="d-flex justify-content-start shadow">
      <OffcanvasComponent />
      <Nav
        fill
        navbar
        className="d-none d-lg-flex">
        <VendorDropDownsList />
      </Nav>
      <DarkModeTogglerButton />
    </Navbar>
  );
};

export default memo(TopNavbar);
