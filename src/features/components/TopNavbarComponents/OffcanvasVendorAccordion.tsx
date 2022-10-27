import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FC, memo, useCallback, useState } from "react";
import ItemNameProvider from "../../contexts/ItemNameProvider";
import useItemNames from "../../customHooks/useItemNames";
import useOfficialVendorName from "../../customHooks/useOfficialVendorName";
import useVendorName from "../../customHooks/useVendorName";
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
          <ItemNameProvider itemName={itemName}>
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
