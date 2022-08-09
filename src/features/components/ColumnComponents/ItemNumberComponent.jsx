import { useState, useRef } from "react";
import { ListGroupItem, Tooltip } from "reactstrap";

function ItemNumberComponent({ vendorName, id, itemObj }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const myRef = useRef(null);

  const toggle = () => setTooltipOpen(prev => !prev);

  const copyItemNumber = (e, text) => {
    toggle();
    navigator.clipboard.writeText(text);
    setTimeout(toggle, 800);
  };

  return (
    <>
      <ListGroupItem
        // ref={myRef}
        id={id}
        role="button"
        onClick={ev => copyItemNumber(ev, itemObj.itemNumber)}
        color="primary"
        key={`${itemObj.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-name`}>
        Item Number: {itemObj.itemNumber}
      </ListGroupItem>
      <Tooltip isOpen={tooltipOpen} target={id}>
        Copied Item Number!
      </Tooltip>
    </>
  );
}

export default ItemNumberComponent;
