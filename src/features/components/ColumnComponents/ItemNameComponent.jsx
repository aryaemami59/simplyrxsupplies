import { useRef, useState } from "react";
import { ListGroupItem, Tooltip } from "reactstrap";

function ItemNameComponent({ vendorName, id, itemObj }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const myRef = useRef(null);

  const toggle = () => setTooltipOpen(prev => !prev);

  const copyItemName = (e, text) => {
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
        onClick={ev => copyItemName(ev, itemObj.name)}
        color="success"
        key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
        Item Name: {itemObj.name}
      </ListGroupItem>
      <Tooltip isOpen={tooltipOpen} target={id}>
        Copied Item Name!
      </Tooltip>
    </>
  );
}

export default ItemNameComponent;
