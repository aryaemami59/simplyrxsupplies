import { AppBar } from "@mui/material";
import { FC, memo } from "react";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import DarkModeTogglerButton from "./DarkModeTogglerButton";
import OffcanvasComponent from "./OffcanvasComponent";

const TopNavbar: FC = () => (
  <AppBar
    color="primary"
    enableColorOnDark
    elevation={0}
    variant="outlined">
    <div className="d-flex align-items-center">
      <span>
        <OffcanvasComponent />
      </span>
      <span className="d-none d-lg-inline-block m-auto">
        <VendorDropDownsList />
      </span>
      <DarkModeTogglerButton />
    </div>
  </AppBar>
);

export default memo(TopNavbar);
