import { memo, useCallback, useRef, useState } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";
import Overlay from "react-bootstrap/Overlay";

function ItemNameComponent({ vendorName, id, itemObj }) {
  const ref = useRef(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = useCallback(() => setTooltipOpen(prev => !prev), []);

  const copyItemName = useCallback(() => {
    toggle();
    navigator.clipboard.writeText(itemObj.name);
    setTimeout(toggle, 500);
  }, [itemObj.name, toggle]);

  return (
    <>
      <ListGroup.Item
        ref={ref}
        id={id}
        role="button"
        onClick={copyItemName}
        variant="success"
        key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
        Item Name: {itemObj.name}
      </ListGroup.Item>
      <Overlay target={ref.current} show={tooltipOpen} placement="top">
        {props => (
          <Tooltip id="overlay-example" {...props}>
            Copied Item Name!
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default memo(ItemNameComponent);
