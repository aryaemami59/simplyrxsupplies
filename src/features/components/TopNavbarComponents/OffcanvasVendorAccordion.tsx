import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import { VendorNameType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import { selectVendorOfficialName } from "../../../Redux/selectors";
import useItemNames from "../../customHooks/useItemNames";
import SingleOffcanvasVendorItem from "./SingleOffcanvasVendorItem";

type Props = {
  vendorName: VendorNameType;
};

const OffcanvasVendorAccordion: FC<Props> = ({ vendorName }) => {
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
      TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
      expanded={open}
      onChange={toggle}
      variant="outlined">
      <AccordionSummary className="shadow-sm">
        <Typography>{officialVendorName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {vendorItemNames.map(itemName => (
          <SingleOffcanvasVendorItem
            key={`${itemName}-OffcanvasVendorAccordion`}
            {...{ vendorName, itemName }}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default memo<Props>(OffcanvasVendorAccordion);