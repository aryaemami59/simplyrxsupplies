import { Button, Collapse, Card, ListGroup } from "react-bootstrap";
import { memo, useCallback, useState } from "react";
import BadgeComponent from "../ColumnComponents/BadgeComponent";
import SingleAccordionListItem from "./SingleAccordionListItem";
import PropTypes from "prop-types";

const COLLAPSED = "collapsed";

function VendorAccordion({ officialVendorName, vendorName, items }) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <>
      <h2 className="accordion-header bg-light bg-gradient">
        <Button
          onClick={toggle}
          variant="light"
          className={`accordion-button bg-light bg-gradient ${
            open ? "" : COLLAPSED
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
        <div>
          <Card className="bg-light bg-gradient">
            <Card.Body className="bg-light bg-gradient">
              <ListGroup>
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
    </>
  );
}

VendorAccordion.propTypes = {
  officialVendorName: PropTypes.string,
  vendorName: PropTypes.string,
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

export default memo(VendorAccordion);
