import { Nav, Navbar } from "react-bootstrap";
import { memo, useContext, FC } from "react";
import OffcanvasComponent from "./OffcanvasComponent";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import { DarkMode } from "../../../App";
import DarkModeTogglerButton from "./DarkModeTogglerButton";

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
