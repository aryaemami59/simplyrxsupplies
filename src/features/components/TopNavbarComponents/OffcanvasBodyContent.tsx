import { DialogContent, DialogTitle } from "@mui/material";
import { FC, memo } from "react";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import SideBarAccordionList from "../SideBarComponents/SideBarAccordionList";

const OffcanvasBodyContent: FC = () => (
  <DialogContent dividers>
    <DialogTitle className="mb-">By Vendor</DialogTitle>
    <DialogContent
      dividers
      className="d-flex flex-column justify-content-center align-items-start">
      <VendorDropDownsList />
    </DialogContent>
    <DialogTitle className="mb-">By Category</DialogTitle>
    <DialogContent dividers>
      <SideBarAccordionList />
    </DialogContent>
  </DialogContent>
);

export default memo(OffcanvasBodyContent);
