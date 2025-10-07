import AppBar from "@mui/material/AppBar"
import { memo } from "react"
import { VendorDropDownsList } from "../DropDownComponents/VendorDropDownsList.js"
import { VendorColumnModalComponent } from "../InputComponents/VendorColumnModalComponent.js"
import { DarkModeTogglerButton } from "./DarkModeTogglerButton.js"
import { OffcanvasComponent } from "./OffcanvasComponent.js"

export const TopNavbar = memo(() => (
  <AppBar color="primary" elevation={0} enableColorOnDark variant="outlined">
    <div className="d-flex align-items-center">
      <span className="d-inline-block d-lg-none">
        <OffcanvasComponent />
      </span>
      <DarkModeTogglerButton />
      {/* <Column start="lg"> */}
      <span className="d-none d-lg-inline-block m-auto">
        <VendorDropDownsList />
      </span>
      {/* </Column> */}
      <span className="d-lg-none ms-auto">
        <VendorColumnModalComponent />
      </span>
    </div>
  </AppBar>
))
