import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import type { TransitionProps } from "@mui/material/transitions";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import ItemNameProvider from "../../contexts/ItemNameProvider";
import useItemNames from "../../hooks/useItemNames";
import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import useVendorName from "../../hooks/useVendorName";
import SingleOffcanvasVendorItem from "./SingleOffcanvasVendorItem";

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
      <AccordionSummary className="shadow-sm">
        <Typography>{officialVendorName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
