import { ListGroup } from "react-bootstrap";
import { memo } from "react";
import CopyIconComponent from "./CopyIconComponent";
import PropTypes from "prop-types";

function ItemNameComponent({ vendorName, itemObj }) {
  return (
    <ListGroup.Item
      action
      className="rounded-top fw-bold"
      variant="success"
      key={`${itemObj.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
      Item Name: {itemObj.name}
      <CopyIconComponent
        key={`${vendorName}-${itemObj.name}-CopyIconComponent-ItemNameComponent`}
        content={itemObj.name}
        text={"Name"}
        placement="top"
        itemObj={itemObj}
        vendorName={vendorName}
      />
    </ListGroup.Item>
  );
}

ItemNameComponent.propTypes = {
  vendorName: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(ItemNameComponent);
