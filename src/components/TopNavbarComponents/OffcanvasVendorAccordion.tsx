import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import type { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import AccordionSummary from "@mui/material/AccordionSummary";
import type { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";

import ItemIdProvider from "../../contexts/ItemIdProvider";
import useItemIds from "../../hooks/useItemIds";
import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import useVendorId from "../../hooks/useVendorId";
import SingleOffcanvasVendorItem from "./SingleOffcanvasVendorItem";

const expandIcon: AccordionSummaryProps["expandIcon"] = <ExpandMoreIcon />;

const transitionProps: TransitionProps = {
  unmountOnExit: true,
  mountOnEnter: true,
};

const OffcanvasVendorAccordion: FC = () => {
  const vendorId = useVendorId();
  const [open, setOpen] = useState(false);
  const officialVendorName = useOfficialVendorName(vendorId);

  const vendorItemNames = useItemIds(vendorId);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <Accordion
      expanded={open}
      onChange={toggle}
      TransitionProps={transitionProps}
      variant="outlined">
      <AccordionSummary
        className="shadow-sm"
        expandIcon={expandIcon}>
        <Typography>{officialVendorName}</Typography>
      </AccordionSummary>
      <AccordionDetails className="justify-content-center d-flex flex-column align-items-cente">
        {vendorItemNames.map(itemName => (
          <ItemIdProvider
            key={`${itemName}-OffcanvasVendorAccordion`}
            itemId={itemName}>
            <SingleOffcanvasVendorItem
              key={`${itemName}-OffcanvasVendorAccordion`}
            />
          </ItemIdProvider>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(OffcanvasVendorAccordion);
