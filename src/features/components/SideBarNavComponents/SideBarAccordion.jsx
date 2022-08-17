import { Collapse, Card, ListGroup } from "react-bootstrap";
import { memo, useCallback, useRef, useState } from "react";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectSidebarNavs } from "../../../addedSlice";
import { shallowEqual } from "react-redux";

const COLLAPSED = "collapsed";

function SideBarAccordion({ category }) {
  const sidebarItems = useSelector(selectSidebarNavs(category), shallowEqual);
  const [open, setOpen] = useState(false);
  const nodeRef = useRef(null);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <div>
      <h2 className="accordion-header">
        <button
          onClick={toggle}
          variant="light"
          className={`accordion-button rounded ${open ? "" : COLLAPSED}`}>
          {category}
        </button>
      </h2>
      <Collapse id={category} in={open} ref={nodeRef} className="bg-gradient">
        <div>
          <Card className="bg-dark bg-gradient">
            <Card.Body className="bg-dark bg-gradient">
              <ListGroup>
                {sidebarItems.map(f => (
                  <SingleSideBarAccordionListItem
                    targetId={category}
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
}

ListGroup.propTypes = {
  targetId: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
      keywords: PropTypes.arrayOf(PropTypes.string),
      nav: PropTypes.arrayOf(PropTypes.string),
      vendors: PropTypes.arrayOf(PropTypes.string),
      src: PropTypes.string,
    })
  ),
};

export default memo(SideBarAccordion);
