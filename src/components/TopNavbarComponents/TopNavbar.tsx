import AppBar from "@mui/material/AppBar"
import type { FC } from "react"
import { memo } from "react"
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList"
import VendorColumnModalComponent from "../InputComponents/VendorColumnModalComponent"
import DarkModeTogglerButton from "./DarkModeTogglerButton"
import OffcanvasComponent from "./OffcanvasComponent"

const TopNavbar: FC = () => (
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
)

export default memo(TopNavbar)
