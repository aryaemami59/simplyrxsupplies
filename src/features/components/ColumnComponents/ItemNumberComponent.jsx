import { useState, useCallback, useEffect, memo } from "react";
import { ListGroupItem, Tooltip } from "reactstrap";

function ItemNumberComponent({ vendorName, id, itemObj }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  // const myRef = useRef(null);

  const toggle = useCallback(() => setTooltipOpen(prev => !prev), []);

  useEffect(() => {
    // console.log("toggle changed");
  }, [toggle]);

  const copyItemNumber = useCallback(() => {
    toggle();
    navigator.clipboard.writeText(itemObj.itemNumber);
    setTimeout(toggle, 800);
  }, [toggle, itemObj.itemNumber]);

  useEffect(() => {
    // console.log("copyItemNumber changed");
  }, [copyItemNumber]);

  return (
    <>
      <ListGroupItem
        // ref={myRef}
        id={id}
        role="button"
        onClick={copyItemNumber}
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

export default memo(ItemNumberComponent);
