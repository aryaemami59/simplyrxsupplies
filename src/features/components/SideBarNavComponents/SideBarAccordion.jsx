import { Collapse, Card, ListGroup } from "react-bootstrap";
import { memo, useCallback, useRef, useState } from "react";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectAllItems } from "../../../addedSlice";
import { Row } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { Alert } from "react-bootstrap";

const COLLAPSED = "collapsed";

function SideBarAccordion({ targetId }) {
  const items = useSelector(selectAllItems);
  // const isLoading = useSelector(state => state.item.isLoading);
  // const errMsg = useSelector(state => state.item.errMsg);
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const nodeRef = useRef(null);

  // if (isLoading) {
  //   return (
  //     <div className="d-flex justify-content-center">
  //       <Spinner
  //         animation="border"
  //         role="status"
  //         className="my-5"
  //         variant="info"
  //         style={{ width: "10rem", height: "10rem", borderWidth: "1rem" }}>
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </div>
  //   );
  // }

  // if (errMsg) {
  //   return (
  //     <div className="justify-content-center d-flex mt-5 w-100">
  //       <Alert variant="danger" className="w-75">
  //         <Alert.Heading className="fs-1">
  //           Oh snap! You got an error!
  //         </Alert.Heading>
  //         <p className="fs-2">
  //           Looks like there was a problem loading the page. Either refresh the
  //           page or try again later.
  //         </p>
  //       </Alert>
  //     </div>
  //   );
  // }

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
