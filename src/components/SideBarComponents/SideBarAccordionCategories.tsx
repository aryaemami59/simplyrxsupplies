import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import type { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import AccordionSummary from "@mui/material/AccordionSummary";
import type { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo, useCallback, useRef, useState } from "react";
import { shallowEqual } from "react-redux";

import { useAppSelector } from "../../redux/hooks";
import {
  selectCategoryItemIds,
  selectCategoryName,
} from "../../redux/selectors";
import isEmptyArrayReference from "../../utils/predicates/isEmptyArrayReference";
import SingleSideBarCategoryListItem from "./SingleSideBarCategoryListItem";

const expandIcon: AccordionSummaryProps["expandIcon"] = <ExpandMoreIcon />;

type Props = {
  categoryId: number;
};

const transitionProps: TransitionProps = {
  unmountOnExit: true,
  mountOnEnter: true,
};

const SideBarAccordionCategories: FC<Props> = ({ categoryId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const categoryName = useAppSelector(state =>
    selectCategoryName(state, categoryId)
  );
  const categoryItemIds = useAppSelector(
    state => selectCategoryItemIds(state, categoryId),
    shallowEqual
  );
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <div>
      <Accordion
        expanded={open}
        onChange={toggle}
        TransitionProps={transitionProps}
        variant="outlined">
        <AccordionSummary
          ref={ref}
          className="shadow-sm"
          expandIcon={expandIcon}>
          <Typography>{categoryName}</Typography>
        </AccordionSummary>
        <AccordionDetails className="text-center mw-7">
          {!isEmptyArrayReference(categoryItemIds) &&
            categoryItemIds.map(itemId => (
              <SingleSideBarCategoryListItem
                key={`${itemId}-SingleSideBarAccordionListItem`}
                itemId={itemId}
                target={ref}
              />
            ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

SideBarAccordionCategories.propTypes = {
  categoryId: PropTypes.number.isRequired,
};

export default memo<Props>(SideBarAccordionCategories);
