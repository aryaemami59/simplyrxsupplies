import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import type { AccordionSlotsAndSlotProps } from "@mui/material/Accordion"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import type { AccordionSummaryProps } from "@mui/material/AccordionSummary"
import AccordionSummary from "@mui/material/AccordionSummary"
import Typography from "@mui/material/Typography"
import { useCallback, useState } from "react"
import { ItemIdProvider } from "../../contexts/ItemIdProvider.js"
import { useVendorId } from "../../hooks/useVendorId.js"
import {
  useOfficialVendorName,
  useVendorItemIds,
} from "../../redux/selectors.js"
import { SingleOffcanvasVendorItem } from "./SingleOffcanvasVendorItem.js"

const expandIcon = (
  <ExpandMoreIcon />
) satisfies AccordionSummaryProps["expandIcon"]

const slotProps = {
  transition: {
    mountOnEnter: true,
    unmountOnExit: true,
  },
} as const satisfies AccordionSlotsAndSlotProps["slotProps"]

export const OffcanvasVendorAccordion = () => {
  const vendorId = useVendorId()

  const [open, setOpen] = useState(false)

  const officialVendorName = useOfficialVendorName(vendorId)

  const vendorItemIds = useVendorItemIds(vendorId)

  const toggle = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  return (
    <Accordion
      expanded={open}
      onChange={toggle}
      slotProps={slotProps}
      variant="outlined"
    >
      <AccordionSummary className="shadow-sm" expandIcon={expandIcon}>
        <Typography>{officialVendorName}</Typography>
      </AccordionSummary>
      <AccordionDetails className="justify-content-center d-flex flex-column">
        {vendorItemIds.map(vendorItemId => (
          <ItemIdProvider
            itemId={vendorItemId}
            key={`${vendorItemId.toString()}-OffcanvasVendorAccordion`}
          >
            <SingleOffcanvasVendorItem />
          </ItemIdProvider>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}
