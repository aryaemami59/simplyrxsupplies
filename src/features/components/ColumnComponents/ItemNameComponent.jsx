import { memo } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import CopyIconComponent from "./CopyIconComponent";

function ItemNameComponent({ vendorName, id, itemObj }) {
  return (
    <ListGroup.Item
      id={id}
      role="button"
      variant="success"
      key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
      Item Name: {itemObj.name}
      <CopyIconComponent
        content={itemObj.name}
        text={"Name"}
        placement="right"
      />
    </ListGroup.Item>
  );
}

export default memo(ItemNameComponent);
