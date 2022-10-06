import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import {
  FC,
  memo,
  MouseEventHandler,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Card, Collapse, ListGroup } from "react-bootstrap";
import { shallowEqual } from "react-redux";
import { DarkMode } from "../../../App";
import { Category } from "../../../customTypes/types";
import { selectCategories } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";

const COLLAPSED = "collapsed" as const;

type Props = {
  category: Category;
};

const SideBarAccordion: FC<Props> = ({ category }): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);

  const sidebarItems = useAppSelector(selectCategories(category), shallowEqual);
  const [open, setOpen] = useState(false);
  const nodeRef = useRef<null>(null!);

  const toggle: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const buttonTheme = darkTheme ? "custom-dark-mode" : "custom-light-mode";
  const buttonCollapsed = open ? "" : COLLAPSED;
  const theme = darkTheme ? "bg-dark" : "bg-light";

  return (
    <div
      key={`div-SideBarAccordion-${category}-outer`}
      // style={{ paddingTop: 37 }}
    >
      <Accordion
        expanded={open}
        onClick={toggle}
        // className="shadow"
      >
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
      {/* <h2
        key={`h2-SideBarAccordion-${category}`}
        className="accordion-header">
        <button
          key={`button-SideBarAccordion-${category}`}
          onClick={toggle}
          className={`accordion-button rounded ${buttonTheme} ${buttonCollapsed}`}>
          {category}
        </button>
      </h2>
      <Collapse
        key={`Collapse-SideBarAccordion-${category}`}
        in={open}
        ref={nodeRef}
        className="bg-gradient">
        <div key={`div-SideBarAccordion-${category}-inner`}>
          <Card
            key={`Card-SideBarAccordion-${category}`}
            className={`bg-gradient custom-dark-mode ${theme}`}>
            <Card.Body
              key={`Card.Body-SideBarAccordion-${category}`}
              className={`bg-gradient custom-dark-mode ${theme}`}>
              <ListGroup key={`ListGroup-SideBarAccordion-${category}`}>
                {sidebarItems.map(itemObj => (
                  <SingleSideBarAccordionListItem
                    key={`${itemObj.id}-SingleSideBarAccordionListItem`}
                    {...{ category, itemObj }}
                  />
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </Collapse> */}
    </div>
  );
};

export default memo<Props>(SideBarAccordion);
