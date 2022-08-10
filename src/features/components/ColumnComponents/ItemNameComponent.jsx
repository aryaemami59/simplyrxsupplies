import { memo, useCallback, useRef, useState } from "react";
// import { ListGroupItem } from "reactstrap";
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";
import Overlay from "react-bootstrap/Overlay";

const renderTooltip = props => (
  <Tooltip id="button-tooltip1" {...props}>
    Copied Item Name!
  </Tooltip>
);

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
        color="success"
        key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
        Item Name: {itemObj.name}
      </ListGroup.Item>
      <Overlay
        target={ref.current}
        show={tooltipOpen}
        placement="top"
        // transition={false}
      >
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
