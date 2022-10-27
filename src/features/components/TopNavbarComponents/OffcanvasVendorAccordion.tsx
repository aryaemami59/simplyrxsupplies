import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FC, memo, useCallback, useState } from "react";
import { useAppSelector } from "../../../Redux/hooks";
import { selectVendorOfficialName } from "../../../Redux/selectors";
import useItemNames from "../../customHooks/useItemNames";
import SingleOffcanvasVendorItem from "./SingleOffcanvasVendorItem";
import useVendorName from "../../customHooks/useVendorName";
import ItemNameProvider from "../../contexts/ItemNameProvider";

const transitionProps: TransitionProps = {
  unmountOnExit: true,
  mountOnEnter: true,
};

const OffcanvasVendorAccordion: FC = () => {
  const vendorName = useVendorName();
  const [open, setOpen] = useState(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

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
