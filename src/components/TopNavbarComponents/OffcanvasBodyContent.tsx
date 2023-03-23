import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import type { FC } from "react";
import { memo } from "react";
import SideBarAccordionList from "../SideBarComponents/SideBarAccordionList";
import OffcanvasVendorAccordionList from "./OffcanvasVendorAccordionList";

const OffcanvasBodyContent: FC = () => (
  <DialogContent
    dividers
    className="w-100 p-0">
    <DialogTitle>By Vendor</DialogTitle>
    <DialogContent
      dividers
      className="p-2">
      <OffcanvasVendorAccordionList />
    </DialogContent>
    <DialogTitle>By Category</DialogTitle>
    <DialogContent
      dividers
      className="p-2">
      <SideBarAccordionList />
    </DialogContent>
  </DialogContent>
);

export default memo(OffcanvasBodyContent);
