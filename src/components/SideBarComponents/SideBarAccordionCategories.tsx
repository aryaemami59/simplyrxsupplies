import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import type { AccordionProps } from "@mui/material/Accordion"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import type { AccordionSummaryOwnProps } from "@mui/material/AccordionSummary"
import AccordionSummary from "@mui/material/AccordionSummary"
import PropTypes from "prop-types"
import type { FC } from "react"
import { memo, useCallback, useRef, useState } from "react"
import { useCategoryItemIds, useCategoryName } from "../../redux/selectors"
import SingleSideBarCategoryListItem from "./SingleSideBarCategoryListItem"

const expandIcon: AccordionSummaryOwnProps["expandIcon"] = <ExpandMoreIcon />

type Props = {
  categoryId: number
}

const slotProps: AccordionProps["slotProps"] = {
  transition: {
    unmountOnExit: true,
    mountOnEnter: true,
  },
}

const SideBarAccordionCategories: FC<Props> = ({ categoryId }) => {
  const ref = useRef<HTMLDivElement>(null)

  const categoryName = useCategoryName(categoryId)

  const categoryItemIds = useCategoryItemIds(categoryId)

  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  return (
    <div>
      <Accordion
        expanded={open}
        onChange={toggle}
        slotProps={slotProps}
        variant="outlined"
      >
        <AccordionSummary
          role="button"
          aria-controls={`${categoryId.toString()}-Accordion`}
          ref={ref}
          className="shadow-sm"
          expandIcon={expandIcon}
        >
          {categoryName}
        </AccordionSummary>
        <AccordionDetails className="text-center mw-7">
          {categoryItemIds.map(categoryItemId => (
            <SingleSideBarCategoryListItem
              key={`${categoryItemId.toString()}-SingleSideBarAccordionListItem`}
              itemId={categoryItemId}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

SideBarAccordionCategories.propTypes = {
  categoryId: PropTypes.number.isRequired,
}

export default memo<Props>(SideBarAccordionCategories)
