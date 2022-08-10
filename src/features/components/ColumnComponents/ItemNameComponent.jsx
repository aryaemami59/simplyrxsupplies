import { forwardRef, memo, useCallback, useRef, useState } from "react";
// import { ListGroupItem } from "reactstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";
import Overlay from 'react-bootstrap/Overlay'

const renderTooltip = props => (
  <Tooltip id="button-tooltip1" {...props}>
    Copied Item Name!
  </Tooltip>
);

// const MyListItem = forwardRef((props, ref) => <ListGroupItem {...props} />);

function ItemNameComponent({ vendorName, id, itemObj }) {
  const ref = useRef(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = useCallback(() => setTooltipOpen(prev => !prev), []);

  const copyItemName = useCallback(() => {
    toggle();
    navigator.clipboard.writeText(itemObj.name);
    setTimeout(toggle, 600);
  }, [itemObj.name, toggle]);

  // const copyItemName = useCallback(() => {
  //   toggle();
  //   navigator.clipboard.writeText(itemObj.name);
  //   setTimeout(toggle, 800);
  // }, [toggle, itemObj.name]);

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 0, hide: 100 }}
      overlay={renderTooltip}
      show={tooltipOpen}
      trigger="click">
      <ListGroup.Item
        id={id}
        role="button"
        onClick={copyItemName}
        color="success"
        key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
        Item Name: {itemObj.name}
      </ListGroup.Item>
      {/* <MyListItem
        ref={ref}
        id={id}
        role="button"
        onClick={copyItemName}
        color="success"
        key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
        Item Name: {itemObj.name}
      </MyListItem> */}
      {/* <ListGroupItem
          nodeRef={ref}
          id={id}
          role="button"
          onClick={copyItemName}
          color="success"
          key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
          Item Name: {itemObj.name}
        </ListGroupItem> */}
      {/* <Tooltip isOpen={tooltipOpen} target={id}>
          Copied Item Name!
        </Tooltip> */}
    </OverlayTrigger>
  );
}

export default memo(ItemNameComponent);
