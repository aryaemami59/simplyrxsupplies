import { memo, useCallback, useState } from "react";
import { ListGroupItem, Tooltip } from "reactstrap";

function ItemNameComponent({ vendorName, id, itemObj }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = useCallback(() => setTooltipOpen(prev => !prev), []);

  const copyItemName = useCallback(() => {
    toggle();
    navigator.clipboard.writeText(itemObj.name);
    setTimeout(toggle, 800);
  }, [toggle, itemObj.name]);

  return (
    <>
      <ListGroupItem
        id={id}
        role="button"
        onClick={copyItemName}
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

export default memo(ItemNameComponent);
