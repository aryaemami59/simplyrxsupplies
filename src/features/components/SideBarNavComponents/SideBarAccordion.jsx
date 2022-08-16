import { Collapse, Card, ListGroup } from "react-bootstrap";
import { memo, useCallback, useRef, useState } from "react";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectAllItems } from "../../../addedSlice";
import { Row } from "react-bootstrap";

const COLLAPSED = "collapsed";

function SideBarAccordion({ targetId }) {
  const items = useSelector(selectAllItems);
  const isLoading = useSelector(state => state.item.isLoading);
  const errMsg = useSelector(state => state.item.errMsg);
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const nodeRef = useRef(null);

  if (isLoading) {
    return <Row>is loading</Row>;
  }

  if (errMsg) {
    return <Row>error</Row>;
  }

  return (
    <div>
      <h2 className="accordion-header">
        <button
          onClick={toggle}
          variant="light"
          className={`accordion-button rounded ${open ? "" : COLLAPSED}`}>
          {targetId}
        </button>
      </h2>
      <Collapse id={targetId} in={open} ref={nodeRef} className="bg-gradient">
        <div>
          <Card className="bg-dark bg-gradient">
            <Card.Body className="bg-dark bg-gradient">
              <ListGroup>
                {items
                  .filter(({ nav }) => nav.includes(targetId))
                  .map(f => (
                    <SingleSideBarAccordionListItem
                      items={items}
                      targetId={targetId}
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
