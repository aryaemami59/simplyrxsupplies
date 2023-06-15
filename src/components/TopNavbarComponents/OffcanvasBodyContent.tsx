import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import type { FC } from "react";
import { memo } from "react";

import SideBarAccordionList from "../SideBarComponents/SideBarAccordionList";
import OffcanvasVendorAccordionList from "./OffcanvasVendorAccordionList";

const OffcanvasBodyContent: FC = () => (
  <DialogContent
    className="w-100 p-0"
    dividers>
    <DialogTitle>By Vendor</DialogTitle>
    <DialogContent
      className="p-2"
      dividers>
      <OffcanvasVendorAccordionList />
    </DialogContent>
    <DialogTitle>By Category</DialogTitle>
    <DialogContent
      className="p-2"
      dividers>
      <SideBarAccordionList />
    </DialogContent>
  </DialogContent>
);

export default memo(OffcanvasBodyContent);
