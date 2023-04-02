import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import type { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import type { TransitionProps } from "@mui/material/transitions";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo, useCallback, useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { selectCategoriesItemNames } from "../../redux/selectors";
import type { CategoryName } from "../../types/api";
import { categoryNames } from "../../types/api";
import SingleSideBarCategoryListItem from "./SingleSideBarCategoryListItem";

const expandIcon: AccordionSummaryProps["expandIcon"] = <ExpandMoreIcon />;

type Props = {
  category: CategoryName;
};

const transitionProps: TransitionProps = {
  unmountOnExit: true,
  mountOnEnter: true,
};

const SideBarAccordionCategories: FC<Props> = ({ category }) => {
  const ref = useRef<HTMLDivElement>(null);
  const sidebarItemNames = useAppSelector(
    selectCategoriesItemNames(category),
    shallowEqual
  );
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <div>
      <Accordion
        TransitionProps={transitionProps}
        expanded={open}
        onChange={toggle}
        variant="outlined">
        <AccordionSummary
          ref={ref}
          expandIcon={expandIcon}
          className="shadow-sm">
          <Typography>{category}</Typography>
        </AccordionSummary>
        <AccordionDetails className="text-center mw-7">
          {sidebarItemNames.map(itemName => (
            <SingleSideBarCategoryListItem
              target={ref}
              key={`${itemName}-SingleSideBarAccordionListItem`}
              itemName={itemName}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

SideBarAccordionCategories.propTypes = {
  category: PropTypes.oneOf(categoryNames).isRequired,
};

export default memo<Props>(SideBarAccordionCategories);
