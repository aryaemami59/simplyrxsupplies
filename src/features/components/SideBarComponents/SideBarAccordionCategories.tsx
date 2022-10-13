import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { FC, memo, useCallback, useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { Category } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import { selectCategoriesItemNames } from "../../../Redux/selectors";
import SingleSideBarCategoryListItem from "./SingleSideBarCategoryListItem";

type Props = {
  category: Category;
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
        TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
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
              {...{ category, itemName }}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default memo<Props>(SideBarAccordionCategories);
