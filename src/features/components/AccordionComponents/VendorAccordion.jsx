import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  ListGroup,
  Button,
  Collapse,
  Card,
  CardBody,
} from "reactstrap";
import BadgeComponent from "../ColumnComponents/BadgeComponent";
import PropTypes from "prop-types";
import { memo, useCallback, useRef, useState } from "react";
import SingleAccordionListItem from "./SingleAccordionListItem";

const collapsed = "collapsed";

function VendorAccordion({ officialVendorName, items, vendorName }) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <div>
      <h2 className="accordion-header bg-light bg-gradient">
        <Button
          onClick={toggle}
          color="light"
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
        isOpen={open}
        className="accordion-collapse bg-light bg-gradient">
        <Card className="bg-light bg-gradient">
          <CardBody className="bg-light bg-gradient">
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
          </CardBody>
        </Card>
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
