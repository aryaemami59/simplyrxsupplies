import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FC, memo, useCallback, useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import SingleSideBarCategoryListItem from "./SingleSideBarCategoryListItem";
import { useAppSelector } from "../../Redux/hooks";
import { selectCategoriesItemNames } from "../../Redux/selectors";
import { Category, categoryNames } from "../../custom_types/api";

type Props = {
  category: Category;
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
