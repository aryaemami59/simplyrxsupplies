import { DialogContent, DialogTitle } from "@mui/material";
import { FC, memo } from "react";
import SideBarAccordionList from "../SideBarComponents/SideBarAccordionList";
import OffcanvasVendorAccordionList from "./OffcanvasVendorAccordionList";

const OffcanvasBodyContent: FC = () => (
  <DialogContent dividers>
    <DialogTitle>By Vendor</DialogTitle>
    <DialogContent dividers>
      <OffcanvasVendorAccordionList />
    </DialogContent>
    <DialogTitle>By Category</DialogTitle>
    <DialogContent dividers>
      <SideBarAccordionList />
    </DialogContent>
  </DialogContent>
);

export default memo(OffcanvasBodyContent);
