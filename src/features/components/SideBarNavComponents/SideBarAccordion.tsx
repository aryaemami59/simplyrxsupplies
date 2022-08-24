import { Collapse, Card, ListGroup } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";
import { memo, useCallback, useContext, useRef, useState, FC } from "react";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
import { selectSidebarNavs } from "../../../addedSlice";
// import PropTypes from "prop-types";
import { DarkMode } from "../../../App";

const COLLAPSED = "collapsed";

interface Props {
  category: string;
}

const SideBarAccordion: FC<Props> = ({ category }): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);

  const sidebarItems = useSelector(selectSidebarNavs(category), shallowEqual);
  const [open, setOpen] = useState(false);
  const nodeRef = useRef(null);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div key={`div-SideBarAccordion-${category}-outer`}>
      <h2 key={`h2-SideBarAccordion-${category}`} className="accordion-header">
        <button
          key={`button-SideBarAccordion-${category}`}
          onClick={toggle}
          className={`accordion-button rounded ${
            darkTheme
              ? "custom-dark-mode custom-text-shadow-white"
              : "custom-light-mode custom-text-shadow-white-50"
          } ${open ? "" : COLLAPSED}`}>
          {category}
        </button>
      </h2>
      <Collapse
        key={`Collapse-SideBarAccordion-${category}`}
        // id={category}
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
                {sidebarItems.map((f) => (
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

// ListGroup.propTypes = {
//   category: PropTypes.string,
// };

export default memo(SideBarAccordion);
