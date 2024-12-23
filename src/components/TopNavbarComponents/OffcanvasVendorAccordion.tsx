import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import type { AccordionSlotsAndSlotProps } from "@mui/material/Accordion"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import type { AccordionSummaryProps } from "@mui/material/AccordionSummary"
import AccordionSummary from "@mui/material/AccordionSummary"
import Typography from "@mui/material/Typography"
import type { FC } from "react"
import { memo, useCallback, useState } from "react"

import ItemIdProvider from "../../contexts/ItemIdProvider"
import { useVendorId } from "../../hooks/useVendorId"
import { useOfficialVendorName, useVendorItemIds } from "../../redux/selectors"
import SingleOffcanvasVendorItem from "./SingleOffcanvasVendorItem"

const expandIcon = (
  <ExpandMoreIcon />
) satisfies AccordionSummaryProps["expandIcon"]

const slotProps = {
  transition: {
    unmountOnExit: true,
    mountOnEnter: true,
  },
} as const satisfies AccordionSlotsAndSlotProps["slotProps"]

const OffcanvasVendorAccordion: FC = () => {
  const vendorId = useVendorId()

  const [open, setOpen] = useState(false)

  const officialVendorName = useOfficialVendorName(vendorId)

  const vendorItemNames = useVendorItemIds(vendorId)

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
      <AccordionDetails className="justify-content-center d-flex flex-column align-items-cente">
        {vendorItemNames.map(itemName => (
          <ItemIdProvider
            key={`${itemName.toString()}-OffcanvasVendorAccordion`}
            itemId={itemName}
          >
            <SingleOffcanvasVendorItem
              key={`${itemName.toString()}-OffcanvasVendorAccordion`}
            />
          </ItemIdProvider>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

export default memo(OffcanvasVendorAccordion)
