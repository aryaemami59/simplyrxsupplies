import { AppBar } from "@mui/material";
import { FC, memo, useContext } from "react";
import { Nav } from "react-bootstrap";
import { DarkMode } from "../../../App";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import DarkModeTogglerButton from "./DarkModeTogglerButton";
import OffcanvasComponent from "./OffcanvasComponent";

const TopNavbar: FC = (): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const theme = darkTheme ? "dark" : "light";

  return (
    <AppBar
      // color="transparent"
      // bg={theme}
      // expand="lg"
      // sticky="top"
      // variant={theme}
      // className="d-flex justify-content-start shadow"
    >
      <OffcanvasComponent />
      <Nav
        fill
        navbar
        className="d-none d-lg-flex">
        <VendorDropDownsList />
      </Nav>
      <DarkModeTogglerButton />
    </AppBar>
  );
};

export default memo(TopNavbar);
