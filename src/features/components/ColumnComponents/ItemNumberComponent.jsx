import { memo } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import CopyIconComponent from "./CopyIconComponent";

function ItemNumberComponent({ vendorName, id, itemObj }) {
  return (
    <ListGroup.Item
      id={id}
      role="button"
      variant="primary"
      key={`${itemObj.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-itemNumber`}>
      Item Number: {itemObj.itemNumber}
      <CopyIconComponent
        content={itemObj.itemNumber}
        text={"Number"}
        placement="right"
      />
    </ListGroup.Item>
  );
}

export default memo(ItemNumberComponent);
