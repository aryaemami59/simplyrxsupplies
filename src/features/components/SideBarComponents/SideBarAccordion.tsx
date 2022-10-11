import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import { shallowEqual } from "react-redux";
import { Category } from "../../../customTypes/types";
import { selectCategoriesItemNames } from "../../../Redux/selectors";
import { useAppSelector } from "../../../Redux/hooks";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";

type Props = {
  category: Category;
};

const SideBarAccordion: FC<Props> = ({ category }) => {
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
        <AccordionSummary className="shadow-sm">
          <Typography>{category}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {sidebarItemNames.map(itemName => (
            <SingleSideBarAccordionListItem
              key={`${itemName}-SingleSideBarAccordionListItem`}
              {...{ category, itemName }}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default memo<Props>(SideBarAccordion);
