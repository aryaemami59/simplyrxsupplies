import BadgeComponent from "../ColumnComponents/BadgeComponent";
import PropTypes from "prop-types";
import { memo, useCallback, useRef, useState } from "react";
import SingleAccordionListItem from "./SingleAccordionListItem";
import { Button } from "react-bootstrap";
import { Collapse } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";

// function CustomToggle({ children, eventKey }) {
//   const decoratedOnClick = useAccordionButton(eventKey, () =>
//     console.log("totally custom!")
//   );

//   return (
//     <button
//       type="button"
//       style={{ backgroundColor: "pink" }}
//       onClick={decoratedOnClick}>
//       {children}
//     </button>
//   );
// }

const collapsed = "collapsed";

function VendorAccordion({ officialVendorName, items, vendorName }) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <div className="">
      <h2 className="accordion-header bg-light bg-gradient">
        <Button
          onClick={toggle}
          variant="light"
          className={`accordion-button bg-light bg-gradient ${
            open ? "" : collapsed
          }`}>
          <BadgeComponent
            className="me-4"
            vendorName={vendorName}
            key={`${officialVendorName}-VendorColumn-Badge`}
          />
          {officialVendorName}
        </Button>
      </h2>
      <Collapse
        id={vendorName}
        in={open}
        className="accordion-collapse bg-light bg-gradient">
        <div className="">
          <Card className="bg-light bg-gradient">
            <Card.Body className="bg-light bg-gradient">
              <ListGroup className="">
                {items
                  .filter(e => e[vendorName])
                  .map(e => (
                    <SingleAccordionListItem
                      vendorName={vendorName}
                      vendors={e.vendors}
                      key={`${e.name}-${vendorName}`}
                      itemObj={e}
                      role="button"
                    />
                  ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </Collapse>
    </div>
    // <AccordionItem>
    //   <AccordionHeader targetId={targetId}>
    //     <BadgeComponent
    //       vendorName={vendorName}
    //       key={`${officialVendorName}-VendorColumn-Badge`}
    //     />
    //     {officialVendorName}
    //   </AccordionHeader>
    //   <AccordionBody accordionId={targetId}>
    //     <ListGroup>
    //       {items
    //         .filter(e => e[vendorName])
    //         .map(e => (
    //           <SingleAccordionListItem
    //             vendorName={vendorName}
    //             vendors={e.vendors}
    //             key={`${e.name}-${vendorName}`}
    //             itemObj={e}
    //             role="button"
    //           />
    //         ))}
    //     </ListGroup>
    //   </AccordionBody>
    // </AccordionItem>
  );
}

VendorAccordion.propTypes = {
  targetId: PropTypes.string,
  onToggle: PropTypes.func,
  officialVendorName: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  vendorName: PropTypes.string,
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  onAdd: PropTypes.func,
};

export default memo(VendorAccordion);
