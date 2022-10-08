import { AppBar } from "@mui/material";
import { FC, memo } from "react";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import OffcanvasComponent from "./OffcanvasComponent";

const TopNavbar: FC = () => (
  <AppBar>
    <div className="d-flex align-items-center">
      <span>
        <OffcanvasComponent />
      </span>
      <span className="d-none d-lg-inline-block m-auto">
        <VendorDropDownsList />
      </span>
    </div>
    {/* <DarkModeTogglerButton /> */}
  </AppBar>
);

export default memo(TopNavbar);
