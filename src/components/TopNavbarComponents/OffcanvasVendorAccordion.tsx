import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import type { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import AccordionSummary from "@mui/material/AccordionSummary";
import type { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import ItemNameProvider from "../../contexts/ItemNameProvider";
import useItemNames from "../../hooks/useItemNames";
import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import useVendorName from "../../hooks/useVendorName";
import SingleOffcanvasVendorItem from "./SingleOffcanvasVendorItem";

const expandIcon: AccordionSummaryProps["expandIcon"] = <ExpandMoreIcon />;

const transitionProps: TransitionProps = {
  unmountOnExit: true,
  mountOnEnter: true,
};

const OffcanvasVendorAccordion: FC = () => {
  const vendorName = useVendorName();
  const [open, setOpen] = useState(false);
  const officialVendorName = useOfficialVendorName(vendorName);

  const vendorItemNames = useItemNames(vendorName);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <Accordion
      TransitionProps={transitionProps}
      expanded={open}
      onChange={toggle}
      variant="outlined">
      <AccordionSummary
        expandIcon={expandIcon}
        className="shadow-sm">
        <Typography>{officialVendorName}</Typography>
      </AccordionSummary>
      <AccordionDetails className="justify-content-center d-flex flex-column align-items-cente">
        {vendorItemNames.map(itemName => (
          <ItemNameProvider
            key={`${itemName}-OffcanvasVendorAccordion`}
            itemName={itemName}>
            <SingleOffcanvasVendorItem
              key={`${itemName}-OffcanvasVendorAccordion`}
            />
          </ItemNameProvider>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(OffcanvasVendorAccordion);
