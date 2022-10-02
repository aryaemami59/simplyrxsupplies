import { Collapse, Card, ListGroup } from "react-bootstrap";
import { shallowEqual } from "react-redux";
import {
  memo,
  useCallback,
  useContext,
  useRef,
  useState,
  FC,
  MouseEventHandler,
} from "react";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
import { selectCategories } from "../../../Redux/addedSlice";
import { DarkMode, myContextInterface } from "../../../App";
import { Category } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";

const COLLAPSED = "collapsed" as const;

type Props = {
  category: Category;
};

const SideBarAccordion: FC<Props> = ({ category }): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);

  const sidebarItems = useAppSelector(selectCategories(category), shallowEqual);
  const [open, setOpen] = useState<boolean>(false);
  const nodeRef = useRef<null>(null!);

  const toggle: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const buttonTheme = darkTheme ? "custom-dark-mode" : "custom-light-mode";
  const buttonCollapsed = open ? "" : COLLAPSED;
  const theme = darkTheme ? "bg-dark" : "bg-light";

  return (
    <div key={`div-SideBarAccordion-${category}-outer`}>
      <h2
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
                    category={category}
                    itemObj={itemObj}
                    key={`${itemObj.name}-SingleSideBarAccordionListItem`}
                  />
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </Collapse>
    </div>
  );
};

export default memo<Props>(SideBarAccordion);
