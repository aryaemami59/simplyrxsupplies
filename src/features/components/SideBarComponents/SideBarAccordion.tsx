import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { shallowEqual } from "react-redux";
import { Category } from "../../../customTypes/types";
import { selectCategories } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";

type Props = {
  category: Category;
};

const SideBarAccordion: FC<Props> = ({ category }) => {
  const sidebarItems = useAppSelector(selectCategories(category), shallowEqual);
  const [open, setOpen] = useState(false);

  const toggle: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <div>
      <Accordion
        expanded={open}
        onClick={toggle}>
        <AccordionSummary className="shadow-sm">
          <Typography>{category}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {sidebarItems.map(itemObj => (
            <SingleSideBarAccordionListItem
              key={`${itemObj.id}-SingleSideBarAccordionListItem`}
              {...{ category, itemObj }}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default memo<Props>(SideBarAccordion);
