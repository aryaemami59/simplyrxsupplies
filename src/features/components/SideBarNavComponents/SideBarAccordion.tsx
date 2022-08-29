import { Collapse, Card, ListGroup } from "react-bootstrap";
import { shallowEqual } from "react-redux";
import { memo, useCallback, useContext, useRef, useState, FC } from "react";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
import { selectSidebarNavs } from "../../../addedSlice";
import { DarkMode } from "../../../App";
import { useAppSelector } from "../../../data/store";

const COLLAPSED = "collapsed";

interface Props {
  category: string;
}

const SideBarAccordion: FC<Props> = ({ category }): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);

  const sidebarItems = useAppSelector(
    selectSidebarNavs(category),
    shallowEqual
  );
  const [open, setOpen] = useState(false);
  const nodeRef = useRef(null);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <div key={`div-SideBarAccordion-${category}-outer`}>
      <h2 key={`h2-SideBarAccordion-${category}`} className="accordion-header">
        <button
          key={`button-SideBarAccordion-${category}`}
          onClick={toggle}
          className={`accordion-button rounded ${
            darkTheme ? "custom-dark-mode" : "custom-light-mode"
          } ${open ? "" : COLLAPSED}`}>
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
            className={`bg-gradient custom-dark-mode ${
              darkTheme ? "bg-dark" : "bg-light"
            }`}>
            <Card.Body
              key={`Card.Body-SideBarAccordion-${category}`}
              className={`bg-gradient custom-dark-mode ${
                darkTheme ? "bg-dark" : "bg-light"
              }`}>
              <ListGroup key={`ListGroup-SideBarAccordion-${category}`}>
                {sidebarItems.map(f => (
                  <SingleSideBarAccordionListItem
                    category={category}
                    itemObj={f}
                    key={`${f.name}-SingleSideBarAccordionListItem`}
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

export default memo(SideBarAccordion);
