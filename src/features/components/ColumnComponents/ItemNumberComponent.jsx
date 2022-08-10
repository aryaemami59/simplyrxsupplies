import { useState, useCallback, useEffect, memo, useRef } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";
import Overlay from "react-bootstrap/Overlay";

function ItemNumberComponent({ vendorName, id, itemObj }) {
  const ref = useRef(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = useCallback(() => setTooltipOpen(prev => !prev), []);

  const copyItemNumber = useCallback(() => {
    toggle();
    navigator.clipboard.writeText(itemObj.itemNumber);
    setTimeout(toggle, 500);
  }, [toggle, itemObj.itemNumber]);

  return (
    <>
      <ListGroup.Item
        ref={ref}
        id={id}
        role="button"
        onClick={copyItemNumber}
        variant="primary"
        key={`${itemObj.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-itemNumber`}>
        Item Name: {itemObj.itemNumber}
      </ListGroup.Item>
      <Overlay target={ref.current} show={tooltipOpen} placement="top">
        {props => (
          <Tooltip id="overlay-example" {...props}>
            Copied Item Number!
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default memo(ItemNumberComponent);
